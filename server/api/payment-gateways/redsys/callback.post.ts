import { handleApiError } from '../../../utils/errors'
import { validateCorePaymentGatewayResponse } from '../../../core-model/PaymentGateway/CorePaymentGateway.services'
import { markCorePaymentAttemptAsPaid } from '../../../core-model/Payment/CorePayment.services'
import { PaymentGatewayProvider } from '../../../../shared/PaymentGatewayProvider'

export default defineEventHandler(async (event) => {
  try {
    const headers = getRequestHeaders(event)
    const contentType = (headers['content-type'] || '').toString()

    let body: Record<string, any> = {}

    // Redsys posts application/x-www-form-urlencoded
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const raw = (await readRawBody(event)) || ''
      body = parseUrlEncoded(raw)
    } else {
      body = (await readBody(event)) || {}
    }

    const data = getValidatedRedsysCallbackData(event, body)
    if (!data) return 'OK'

    const {
      Ds_SignatureVersion,
      Ds_MerchantParameters,
      Ds_Signature,
      merchantParams,
      paymentAttemptId
    } = data

    // Step 1: validate signature (core).
    await validateCorePaymentGatewayResponse(PaymentGatewayProvider.REDSYS, {
      Ds_SignatureVersion,
      Ds_MerchantParameters,
      Ds_Signature
    })

    // Step 2: mark as paid if Redsys response indicates success (< 100)
    const responseCodeRaw = merchantParams?.Ds_Response ?? merchantParams?.DS_RESPONSE
    const responseCode = typeof responseCodeRaw === 'string' || typeof responseCodeRaw === 'number'
      ? Number(responseCodeRaw)
      : NaN

    if (!Number.isNaN(responseCode) && responseCode < 100) {
      const gatewayTransactionId = (merchantParams?.Ds_AuthorisationCode ?? merchantParams?.DS_AUTHORISATIONCODE) as unknown

      await markCorePaymentAttemptAsPaid(paymentAttemptId, {
        gatewayTransactionId: (typeof gatewayTransactionId === 'string' && gatewayTransactionId.length > 0)
          ? gatewayTransactionId
          : paymentAttemptId,
        // For Redsys callbacks we don't know the settlement amount/currency at this point
        gatewaySettlementAmount: null,
        gatewayFee: null,
        gatewayRawResponse: merchantParams
      })
    } else {
      console.warn('[Redsys callback] Payment not successful', {
        paymentAttemptId,
        Ds_Response: responseCodeRaw
      })
    }

    setResponseHeader(event, 'content-type', 'text/plain')
    return 'OK'

  } catch (error: any) {
    // Redsys may retry if we return non-200. Prefer to acknowledge and log.
    console.error('[Redsys callback] Error', error)
    try {
      handleApiError(error)
    } catch {
      // ignore - we still return OK below
    }
    setResponseHeader(event, 'content-type', 'text/plain')
    return 'OK'
  }
})

function normalizeField(body: Record<string, any>, ...keys: string[]): string | null {
  for (const key of keys) {
    const v = body?.[key]
    if (typeof v === 'string' && v.length > 0) return v
  }
  return null
}

function parseUrlEncoded(raw: string): Record<string, string> {
  const params = new URLSearchParams(raw)
  const out: Record<string, string> = {}
  for (const [k, v] of params.entries()) out[k] = v
  return out
}

function decodeBase64UrlToString(base64Url: string): string {
  const normalized = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const pad = normalized.length % 4
  const padded = pad ? normalized + '='.repeat(4 - pad) : normalized
  return Buffer.from(padded, 'base64').toString('utf-8')
}

function getValidatedRedsysCallbackData(
  event: any,
  body: Record<string, any>
): {
  Ds_SignatureVersion: string
  Ds_MerchantParameters: string
  Ds_Signature: string
  merchantParams: Record<string, any>
  paymentAttemptId: string
} | null {
  const Ds_SignatureVersion = normalizeField(body, 'Ds_SignatureVersion', 'DS_SIGNATUREVERSION')
  const Ds_MerchantParameters = normalizeField(body, 'Ds_MerchantParameters', 'DS_MERCHANTPARAMETERS')
  const Ds_Signature = normalizeField(body, 'Ds_Signature', 'DS_SIGNATURE')

  if (!Ds_SignatureVersion || !Ds_MerchantParameters || !Ds_Signature) {
    // Always return 200 to avoid gateway retries, but log the issue.
    console.error('[Redsys callback] Missing required fields', { Ds_SignatureVersion, Ds_MerchantParameters: !!Ds_MerchantParameters, Ds_Signature: !!Ds_Signature })
    setResponseHeader(event, 'content-type', 'text/plain')
    return null
  }

  // Extract paymentAttemptId from Ds_MerchantParameters (Redsys: Ds_Order)
  let merchantParams: Record<string, any> | null = null
  try {
    const parsed = JSON.parse(decodeBase64UrlToString(Ds_MerchantParameters)) as unknown
    if (!parsed || typeof parsed !== 'object') {
      console.error('[Redsys callback] Invalid Ds_MerchantParameters JSON object')
      setResponseHeader(event, 'content-type', 'text/plain')
      return null
    }

    merchantParams = parsed as Record<string, any>
  } catch (e) {
    console.error('[Redsys callback] Invalid Ds_MerchantParameters JSON')
    setResponseHeader(event, 'content-type', 'text/plain')
    return null
  }

  const paymentAttemptId = merchantParams?.Ds_Order || merchantParams?.DS_ORDER
  if (!paymentAttemptId || typeof paymentAttemptId !== 'string') {
    console.error('[Redsys callback] Missing Ds_Order in merchant parameters')
    setResponseHeader(event, 'content-type', 'text/plain')
    return null
  }

  return {
    Ds_SignatureVersion,
    Ds_MerchantParameters,
    Ds_Signature,
    merchantParams,
    paymentAttemptId
  }
}

