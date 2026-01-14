import type { CoreOrder } from './CoreOrder'
import { coreOrderFromCoreApiAdapter } from './CoreOrder.adapter'
import type { CoreOrderJson } from './CoreOrder.adapter'
import { coreApiClient } from '../../api-client/core'

const BASE_URL = '/api/v1/sales/orders'

export function findCoreOrderById(id: string): Promise<CoreOrder> {
  const endpoint = `${BASE_URL}/${id}`
  return coreApiClient.get<CoreOrderJson>(endpoint)
    .then(response => coreOrderFromCoreApiAdapter(response))
}

export function createCoreOrder(data: any): Promise<void> {
  return coreApiClient.post(BASE_URL, data)
}
