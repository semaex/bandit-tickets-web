import type { CorePaymentGateway } from './CorePaymentGateway'
import { corePaymentGatewayFromJson } from './CorePaymentGateway.adapter'
import type { CorePaymentGatewayJson } from './CorePaymentGateway.adapter'
import { coreApiClient } from '../../api-client/core'

export type PaymentGatewayCheckoutConfig = {
  provider: string
  actionUrl: string
  settings: Record<string, string>
}

const BASE_URL = '/api/v1/sales/payment-gateways'

export async function findCorePaymentGatewayById(id: string): Promise<CorePaymentGateway> {
  const endpoint = `${BASE_URL}/${id}`
  return coreApiClient.get<CorePaymentGatewayJson>(endpoint)
    .then(response => corePaymentGatewayFromJson(response))
}

export async function findCorePaymentGatewayCheckoutConfig(
  paymentGatewayId: string,
  reference: string,
  amount: { amount: number, currency: string }
): Promise<PaymentGatewayCheckoutConfig> {
  const endpoint = `${BASE_URL}/${paymentGatewayId}/checkout-config`
  const amountParam = JSON.stringify(amount)
  return coreApiClient.get<PaymentGatewayCheckoutConfig>(
    `${endpoint}?reference=${encodeURIComponent(reference)}&amount=${encodeURIComponent(amountParam)}`
  )
}

export async function validateCorePaymentGatewayResponse(
  provider: string,
  gatewayResponse: Record<string, any>
): Promise<void> {
  const endpoint = `${BASE_URL}/validate-response`
  await coreApiClient.post(endpoint, {
    provider,
    gatewayResponse
  })
}
