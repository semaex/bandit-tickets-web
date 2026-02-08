import { handleApiError } from '../../../utils/errors'
import { validateCorePaymentGatewayResponse } from '../../../core-model/PaymentGateway/CorePaymentGateway.services'
import { markCorePaymentAttemptAsPaid } from '../../../core-model/Payment/CorePayment.services'
import { PaymentGatewayProvider } from '../../../../shared/PaymentGatewayProvider'

export default defineEventHandler(async (event) => {
  try {
    let body: Record<string, any> = {}
    const rawBody = (await readRawBody(event)) || ''

    // Redsys posts application/x-www-form-urlencoded
    body = parseUrlEncoded(rawBody)

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
        gatewayRawResponse: rawBody
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

  // Decode Ds_MerchantParameters; paymentAttemptId comes from Ds_MerchantData (we send it there because Ds_Order is limited to 12 chars)
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

  const merchantDataRaw = merchantParams?.Ds_MerchantData ?? merchantParams?.DS_MERCHANTDATA ?? merchantParams?.DS_MERCHANT_MERCHANTDATA
  let paymentAttemptId: string | null = null
  if (typeof merchantDataRaw === 'string' && merchantDataRaw.length > 0) {
    try {
      const merchantData = JSON.parse(merchantDataRaw) as Record<string, unknown>
      paymentAttemptId = typeof merchantData?.paymentAttemptId === 'string' ? merchantData.paymentAttemptId : null
    } catch {
      // ignore
    }
  }
  if (!paymentAttemptId) {
    paymentAttemptId = merchantParams?.Ds_Order || merchantParams?.DS_ORDER
  }
  if (!paymentAttemptId || typeof paymentAttemptId !== 'string') {
    console.error('[Redsys callback] Missing paymentAttemptId (Ds_MerchantData.paymentAttemptId or Ds_Order)')
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

