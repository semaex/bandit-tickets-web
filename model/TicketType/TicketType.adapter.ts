import { TicketType } from './TicketType'
import { Uuid } from '../Shared/Uuid'
import { StringMultilanguage } from '../Shared/StringMultilanguage'
import { Money } from '../Shared/Money'

export interface ApiTicketType {
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

export function ticketTypeFromApiAdapter(item: ApiTicketType): TicketType {
  return new TicketType(
    Uuid.fromString(item.id),
    Uuid.fromString(item.eventId),
    item.name ? StringMultilanguage.fromArray(item.name) : null,
    item.description ? StringMultilanguage.fromArray(item.description) : null,
    item.price ? Money.fromArray(item.price) : null,
    item.salesStock,
    item.invitationsStock,
    item.isPublished,
    item.isSoldOut,
    item.enabledFrom ? new Date(item.enabledFrom) : null,
    item.enabledTo ? new Date(item.enabledTo) : null,
    new Date(item.createdAt),
    new Date(item.updatedAt)
  )
}

