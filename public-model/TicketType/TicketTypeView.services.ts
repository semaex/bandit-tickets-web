import type { TicketTypeView } from './TicketTypeView'
import type { TicketTypeViewJson } from './TicketTypeView.adapter'
import { ticketTypeViewFromJson } from './TicketTypeView.adapter'

export async function findTicketTypeViewsByEvent(eventId: string): Promise<TicketTypeView[]> {
  return $fetch<TicketTypeViewJson[]>(`/api/ticket-types/by-event/${eventId}`).then((ticketTypeViewJsonArray: TicketTypeViewJson[]) => {
    return ticketTypeViewJsonArray.map(ticketTypeViewFromJson)
  })
}

