import type { EventView } from "./EventView"
import type { VenueView } from "../Venue/VenueView"
import type { PromoterProfileView } from "../PromoterProfile/PromoterProfileView"
import type { EventBuyerSupportView } from "./EventBuyerSupportView"

export class EventPurchaseView {
  constructor(
      public readonly eventView: EventView,
      public readonly venueView: VenueView | null,
      public readonly promoterProfileView: PromoterProfileView,
      public readonly buyerFeePercent: number,
      public readonly buyerSupportView: EventBuyerSupportView
  ) {}
}

