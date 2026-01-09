import { TicketTypeView } from './TicketTypeView'
import type { CoreTicketType } from '../../server/core-model/TicketType/CoreTicketType'
import { Uuid } from '../../shared/Uuid'
import { StringMultilanguage } from '../../shared/StringMultilanguage'
import { Money } from '../../shared/Money'

export interface TicketTypeViewJson {
  id: string
  eventId: string
  name: Record<string, string> | null
  description: Record<string, string> | null
  price: { amount: number; currency: string; formatted?: string } | null
  isPublished: boolean
  isSoldOut: boolean
}

export function ticketTypeViewFromJson(json: TicketTypeViewJson): TicketTypeView {
  return new TicketTypeView(
    Uuid.fromString(json.id),
    Uuid.fromString(json.eventId),
    json.name ? StringMultilanguage.fromArray(json.name) : null,
    json.description ? StringMultilanguage.fromArray(json.description) : null,
    json.price ? Money.fromArray(json.price) : null,
    json.isPublished,
    json.isSoldOut,
  )
}

export function ticketTypeViewToJson(ticketTypeView: TicketTypeView): TicketTypeViewJson {
  return {
    id: ticketTypeView.id.toString(),
    eventId: ticketTypeView.eventId.toString(),
    name: ticketTypeView.name?.toArray() || null,
    description: ticketTypeView.description?.toArray() || null,
    price: ticketTypeView.price?.toArray() || null,
    isPublished: ticketTypeView.isPublished,
    isSoldOut: ticketTypeView.isSoldOut
  }
}

export function ticketTypeViewFromCoreTicketTypeAdapter(coreTicketType: CoreTicketType): TicketTypeView {
    return new TicketTypeView(
      coreTicketType.id,
      coreTicketType.eventId,
      coreTicketType.name,
      coreTicketType.description,
      coreTicketType.price,
      coreTicketType.isPublished,
      coreTicketType.isSoldOut,
    )
  }
