import { Uuid } from "../../../shared/Uuid"
import type { CorePromoterAgreement } from "../PromoterAgreement/CorePromoterAgreement"
import { BuyerSupportResponsibility } from "../../../shared/BuyerSupportResponsibility"
import { Email } from "../../../shared/Email"
import { PhoneNumber } from "../../../shared/PhoneNumber"
import type { CorePromoterProfile } from "../PromoterProfile/CorePromoterProfile"
import { environment } from "../../config/environment"

export class CoreEventBuyerSupport {
    constructor(
        public readonly eventId: Uuid,
        public readonly responsible: BuyerSupportResponsibility,
        public readonly name: string,
        public readonly email: Email | null,
        public readonly phone: PhoneNumber | null
    ) {}

    public static fromPromoterProfileAndPromoterAgreement(eventId: Uuid, promoterProfile: CorePromoterProfile, corePromoterAgreement: CorePromoterAgreement ) {
        const responsible = corePromoterAgreement.buyerSupportResponsibility
        let name: string
        let email: Email | null
        let phone: PhoneNumber | null
        
        if (responsible===BuyerSupportResponsibility.BANDIT_TICKETS) {
            name = "Bandit Tickets"
            email = Email.fromString(environment.buyerSupport.email)
            phone = environment.buyerSupport.phone ? PhoneNumber.fromE164(environment.buyerSupport.phone) : null
        } else {
            name = promoterProfile.brandName
            email = promoterProfile.supportEmail
            phone = promoterProfile.supportPhone
        }

        return new CoreEventBuyerSupport(
            eventId,
            responsible,
            name,
            email,
            phone
        )
    }
}
