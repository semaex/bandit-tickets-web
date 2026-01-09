import { CoreTicketType } from './CoreTicketType'
import { Uuid } from '../../../shared/Uuid'
import { StringMultilanguage } from '../../../shared/StringMultilanguage'
import { Money } from '../../../shared/Money'

export interface CoreTicketTypeJson {
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

export function coreTicketTypeFromJson(json: CoreTicketTypeJson): CoreTicketType {
  return new CoreTicketType(
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

