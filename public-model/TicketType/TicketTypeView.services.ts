import type { TicketTypeView } from './TicketTypeView'
import type { TicketTypeViewJson } from './TicketTypeView.adapter'
import { ticketTypeViewFromJson } from './TicketTypeView.adapter'
import { bffApiClient } from '../../server/api-client/bff'

export async function findTicketTypeViewsByEvent(eventId: string): Promise<TicketTypeView[]> {
  const ticketTypeViewJsonArray = await bffApiClient.get<TicketTypeViewJson[]>(`/ticket-types/by-event/${eventId}`)
  return ticketTypeViewJsonArray.map(ticketTypeViewFromJson)
}

