import { handleCoreApiCall } from '../../../api-client/core'
import { getRouterParamOrFail } from '../../../utils/params'
import { findCoreEventBySlug } from "../../../core-model/Event/CoreEvent.services"
import { findCoreVenueById } from "../../../core-model/Venue/CoreVenue.services"
import { findCorePromoterAgreementById } from "../../../core-model/PromoterAgreement/CorePromoterAgreement.services"
import { findCorePromoterProfileById } from "../../../core-model/PromoterProfile/CorePromoterProfile.services"
import { EventPurchaseView } from "../../../../public-model/Event/EventPurchaseView"
import { eventViewFromCoreEventAdapter } from "../../../../public-model/Event/EventView.adapter"
import { eventBuyerSupportViewFromCoreEventBuyerSupportAdapter } from "../../../../public-model/Event/EventBuyerSupportView.adapter"
import { venueViewFromCoreVenueAdapter } from "../../../../public-model/Venue/VenueView.adapter"
import { promoterProfileViewFromCorePromoterProfileAdapter } from "../../../../public-model/PromoterProfile/PromoterProfileView.adapter"
import { CoreEventBuyerSupport } from '../../../core-model/Event/CoreEventBuyerSupport'
import { eventPurchaseViewToJson } from '~/public-model/Event/EventPurchaseView.adapter'

export default defineEventHandler(async (event) => {
    const slug = getRouterParamOrFail(event, 'slug')

    return handleCoreApiCall(async () => {
        const coreEvent = await findCoreEventBySlug(slug)

        const venueId = coreEvent.venueId?.toString() ?? null
        const promoterProfileId = coreEvent.promoterProfileId!.toString()
        const promoterAgreementId = coreEvent.promoterAgreementId.toString()

        const [coreVenue, corePromoterProfile, corePromoterAgreement] = await Promise.all([
            venueId !== null 
                ? findCoreVenueById(venueId)
                : Promise.resolve(null),
            findCorePromoterProfileById(promoterProfileId),
            findCorePromoterAgreementById(promoterAgreementId)
        ])

        const coreEventBuyerSupport = CoreEventBuyerSupport.fromPromoterProfileAndPromoterAgreement(coreEvent.id, corePromoterProfile, corePromoterAgreement)

        const eventPurchaseView = new EventPurchaseView(
            eventViewFromCoreEventAdapter(coreEvent),
            coreVenue ? venueViewFromCoreVenueAdapter(coreVenue) : null,
            promoterProfileViewFromCorePromoterProfileAdapter(corePromoterProfile),
            coreEvent.buyerFeePercent?.toBasisPoints() ?? 0,
            eventBuyerSupportViewFromCoreEventBuyerSupportAdapter(coreEventBuyerSupport)
        )

        return eventPurchaseViewToJson(eventPurchaseView)

    }, 'fetch event purchase view')
})

