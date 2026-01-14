import { bffApiClient } from '../../server/api-client/bff'
import type { CheckoutRequest } from './CheckoutRequest'

export async function submitCheckout(request: CheckoutRequest): Promise<void> {
  return await bffApiClient.post('/checkout', request)
}
