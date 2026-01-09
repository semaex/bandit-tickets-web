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
  salesStock: number | null
  invitationsStock: number
  isPublished: boolean
  isSoldOut: boolean
  enabledFrom: string | null
  enabledTo: string | null
  createdAt: string
  updatedAt: string
}

export function ticketTypeViewFromJson(json: TicketTypeViewJson): TicketTypeView {
  return new TicketTypeView(
    Uuid.fromString(json.id),
    Uuid.fromString(json.eventId),
    json.name ? StringMultilanguage.fromArray(json.name) : null,
    json.description ? StringMultilanguage.fromArray(json.description) : null,
    json.price ? Money.fromArray(json.price) : null,
    json.salesStock,
    json.invitationsStock,
    json.isPublished,
    json.isSoldOut,
    json.enabledFrom ? new Date(json.enabledFrom) : null,
    json.enabledTo ? new Date(json.enabledTo) : null,
    new Date(json.createdAt),
    new Date(json.updatedAt)
  )
}

export function ticketTypeViewToJson(ticketTypeView: TicketTypeView): TicketTypeViewJson {
  return {
    id: ticketTypeView.id.toString(),
    eventId: ticketTypeView.eventId.toString(),
    name: ticketTypeView.name?.toArray() || null,
    description: ticketTypeView.description?.toArray() || null,
    price: ticketTypeView.price?.toArray() || null,
    salesStock: ticketTypeView.salesStock,
    invitationsStock: ticketTypeView.invitationsStock,
    isPublished: ticketTypeView.isPublished,
    isSoldOut: ticketTypeView.isSoldOut,
    enabledFrom: ticketTypeView.enabledFrom?.toISOString() || null,
    enabledTo: ticketTypeView.enabledTo?.toISOString() || null,
    createdAt: ticketTypeView.createdAt.toISOString(),
    updatedAt: ticketTypeView.updatedAt.toISOString()
  }
}

export function ticketTypeViewFromCoreTicketTypeAdapter(coreTicketType: CoreTicketType): TicketTypeView {
    return new TicketTypeView(
      coreTicketType.id,
      coreTicketType.eventId,
      coreTicketType.name,
      coreTicketType.description,
      coreTicketType.price,
      coreTicketType.salesStock,
      coreTicketType.invitationsStock,
      coreTicketType.isPublished,
      coreTicketType.isSoldOut,
      coreTicketType.enabledFrom,
      coreTicketType.enabledTo,
      coreTicketType.createdAt,
      coreTicketType.updatedAt
    )
  }
  