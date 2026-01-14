import type { CoreBuyer } from './CoreBuyer'
import { coreBuyerFromCoreApiAdapter } from './CoreBuyer.adapter'
import type { CoreBuyerJson } from './CoreBuyer.adapter'
import { coreApiClient } from '../../api-client/core'

const BASE_URL = '/api/v1/sales/buyers'

export function findCoreBuyerById(id: string): Promise<CoreBuyer> {
  const endpoint = `${BASE_URL}/${id}`
  return coreApiClient.get<CoreBuyerJson>(endpoint)
    .then(response => coreBuyerFromCoreApiAdapter(response))
}

export function findCoreBuyerByEmail(email: string): Promise<CoreBuyer> {
  const endpoint = `${BASE_URL}/by-email?email=${encodeURIComponent(email)}`
  return coreApiClient.get<CoreBuyerJson>(endpoint)
    .then(response => coreBuyerFromCoreApiAdapter(response))
}

export function createCoreBuyer(data: any): Promise<void> {
  return coreApiClient.post(BASE_URL, data)
}

export function updateCoreBuyer(id: string, data: any): Promise<void> {
  return coreApiClient.put(`${BASE_URL}/${id}`, data)
}
