import type { TicketType } from './TicketType'
import { ticketTypeFromApiAdapter } from './TicketType.adapter'
import type { ApiTicketType } from './TicketType.adapter'

export async function findTicketTypesByEvent(eventId: string): Promise<TicketType[]> {
  return $fetch<{ ticketTypes: ApiTicketType[] }>(`/api/ticket-types/by-event/${eventId}`).then((data: { ticketTypes: ApiTicketType[] }) => {
    return data.ticketTypes.map(ticketTypeFromApiAdapter)
  })
}

