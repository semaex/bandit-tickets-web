import { EventPurchaseView } from './EventPurchaseView'
import { eventViewFromJson, eventViewToJson, type EventViewJson } from './EventView.adapter'
import { eventBuyerSupportViewFromJson, eventBuyerSupportViewToJson, type EventBuyerSupportViewJson } from './EventBuyerSupportView.adapter'
import { venueViewFromJson, venueViewToJson, type VenueViewJson } from '../Venue/VenueView.adapter'
import { promoterProfileViewFromJson, promoterProfileViewToJson, type PromoterProfileViewJson } from '../PromoterProfile/PromoterProfileView.adapter'

export interface EventPurchaseViewJson {
  eventView: EventViewJson
  venueView: VenueViewJson | null
  promoterProfileView: PromoterProfileViewJson
  buyerFeePercent: number
  buyerSupportView: EventBuyerSupportViewJson
}

export function eventPurchaseViewFromJson(json: EventPurchaseViewJson): EventPurchaseView {
  return new EventPurchaseView(
    eventViewFromJson(json.eventView),
    json.venueView ? venueViewFromJson(json.venueView) : null,
    promoterProfileViewFromJson(json.promoterProfileView),
    json.buyerFeePercent,
    eventBuyerSupportViewFromJson(json.buyerSupportView)
  )
}

export function eventPurchaseViewToJson(eventPurchaseView: EventPurchaseView): EventPurchaseViewJson {
  return {
    eventView: eventViewToJson(eventPurchaseView.eventView),
    venueView: eventPurchaseView.venueView ? venueViewToJson(eventPurchaseView.venueView) : null,
    promoterProfileView: promoterProfileViewToJson(eventPurchaseView.promoterProfileView),
    buyerFeePercent: eventPurchaseView.buyerFeePercent,
    buyerSupportView: eventBuyerSupportViewToJson(eventPurchaseView.buyerSupportView)
  }
}

