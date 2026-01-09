import { Uuid } from "../../../shared/Uuid"
import { BuyerFeeMode } from "../../../shared/BuyerFeeMode"
import type { CorePromoterAgreement } from "../PromoterAgreement/CorePromoterAgreement"
import type { CoreEvent } from "./CoreEvent"

export class CoreEventBuyerFee {
    constructor(
        public readonly eventId: Uuid,
        public readonly mode: BuyerFeeMode,
        public readonly platformFeePercent: number,
        public readonly promoterFeePercent: number
    ) {}

    public static fromEventAndPromoterAgreement(coreEvent: CoreEvent, corePromoterAgreement: CorePromoterAgreement ) {
        return new CoreEventBuyerFee(
            coreEvent.id,
            coreEvent.buyerFeeMode!,
            corePromoterAgreement.platformFeePercent,
            corePromoterAgreement.promoterFeePercent
        )
    }

    public totalPercent(): number {
        return this.platformFeePercent + this.promoterFeePercent
    }

    public appliedPercent(): number {
        return this.mode === BuyerFeeMode.INCLUDED ? 0 : this.totalPercent()
    }
}
