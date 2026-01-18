import type { CorePaymentAttempt } from './CorePaymentAttempt'
import { corePaymentAttemptFromJson } from './CorePayment.adapter'
import type { CorePaymentAttemptJson } from './CorePayment.adapter'
import { coreApiClient } from '../../api-client/core'

const BASE_URL = '/api/v1/sales/payments'

export async function findCorePaymentAttemptById(paymentAttemptId: string): Promise<CorePaymentAttempt> {
  const endpoint = `${BASE_URL}/attempts/${paymentAttemptId}`
  return coreApiClient.get<CorePaymentAttemptJson>(endpoint)
    .then(response => corePaymentAttemptFromJson(response))
}

export async function createCorePaymentAttemptForOrder(paymentAttemptId: string, orderId: string): Promise<void> {
  const endpoint = `${BASE_URL}/attempts/for-order`
  return coreApiClient.post(endpoint, {
    paymentAttemptId,
    orderId
  })
}

export async function markCorePaymentAttemptAsProcessing(paymentAttemptId: string): Promise<void> {
  const endpoint = `${BASE_URL}/attempts/${encodeURIComponent(paymentAttemptId)}/mark-as-processing`
  await coreApiClient.post(endpoint, {})
}
