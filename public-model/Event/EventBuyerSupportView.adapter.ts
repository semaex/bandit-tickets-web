import { EventBuyerSupportView } from './EventBuyerSupportView'
import type { CoreEventBuyerSupport } from '../../server/core-model/Event/CoreEventBuyerSupport'
import { Uuid } from '../../shared/Uuid'
import { Email } from '../../shared/Email'
import type { BuyerSupportResponsibility } from '../../shared/BuyerSupportResponsibility'

export interface EventBuyerSupportViewJson {
  eventId: string
  responsible: string
  name: string
  email: string | null
}

export function eventBuyerSupportViewFromCoreEventBuyerSupportAdapter(coreEventBuyerSupport: CoreEventBuyerSupport): EventBuyerSupportView {
  return new EventBuyerSupportView(
    coreEventBuyerSupport.eventId,
    coreEventBuyerSupport.responsible,
    coreEventBuyerSupport.name,
    coreEventBuyerSupport.email
  )
}

export function eventBuyerSupportViewFromJson(json: EventBuyerSupportViewJson): EventBuyerSupportView {
  return new EventBuyerSupportView(
    Uuid.fromString(json.eventId),
    json.responsible as BuyerSupportResponsibility,
    json.name,
    json.email ? Email.fromString(json.email) : null
  )
}

export function eventBuyerSupportViewToJson(eventBuyerSupportView: EventBuyerSupportView): EventBuyerSupportViewJson {
  return {
    eventId: eventBuyerSupportView.eventId.toString(),
    responsible: eventBuyerSupportView.responsible,
    name: eventBuyerSupportView.name,
    email: eventBuyerSupportView.email?.toString() || null
  }
}

