import type { CoreTicketType } from './CoreTicketType'
import { coreTicketTypeFromJson } from './CoreTicketType.adapter'
import type { CoreTicketTypeJson } from './CoreTicketType.adapter'
import { coreApiClient } from '../../api-client/core'

const BASE_URL = '/api/v1/catalog/ticket-types'

export async function findCoreTicketTypesByEvent(eventId: string): Promise<CoreTicketType[]> {
  const endpoint = `${BASE_URL}/by-event/${eventId}`
  return coreApiClient.get<CoreTicketTypeJson[]>(endpoint)
    .then((data: CoreTicketTypeJson[]) => data.map(coreTicketTypeFromJson))
}

