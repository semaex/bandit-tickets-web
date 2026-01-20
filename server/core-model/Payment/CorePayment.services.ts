import type { CorePayment } from './CorePayment'
import { corePaymentFromJson } from './CorePayment.adapter'
import type { CorePaymentJson } from './CorePayment.adapter'
import { coreApiClient } from '../../api-client/core'

const BASE_URL = '/api/v1/sales/payments'

export async function findCorePaymentById(id: string): Promise<CorePayment> {
  const endpoint = `${BASE_URL}/${id}`
  return coreApiClient.get<CorePaymentJson>(endpoint)
    .then(response => corePaymentFromJson(response))
}

export async function findCorePaymentByOrderId(orderId: string): Promise<CorePayment> {
  const endpoint = `${BASE_URL}/orders/${orderId}`
  return coreApiClient.get<CorePaymentJson>(endpoint)
    .then(response => corePaymentFromJson(response))
}

export async function markCorePaymentAttemptAsPaid(
  paymentAttemptId: string,
  data: {
    gatewayTransactionId: string
    gatewaySettlementAmount: { amount?: number | null, currency?: string | null } | null
    gatewayFee: { amount: number, currency: string } | null
    gatewayRawResponse: string
  }
): Promise<void> {
  const endpoint = `${BASE_URL}/attempts/${encodeURIComponent(paymentAttemptId)}/mark-as-paid`
  await coreApiClient.post(endpoint, data)
}
