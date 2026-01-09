import type { CoreTicketType } from './CoreTicketType'
import { coreTicketTypeFromJson } from './CoreTicketType.adapter'
import type { CoreTicketTypeJson } from './CoreTicketType.adapter'

export async function findCoreTicketTypesByEvent(eventId: string): Promise<CoreTicketType[]> {
  return $fetch<{ ticketTypes: CoreTicketTypeJson[] }>(`/api/ticket-types/by-event/${eventId}`).then((data: { ticketTypes: CoreTicketTypeJson[] }) => {
    return data.ticketTypes.map(coreTicketTypeFromJson)
  })
}

