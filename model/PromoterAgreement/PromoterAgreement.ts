import { Uuid } from '../Shared/Uuid'
import { PromoterAgreementStatus } from './PromoterAgreementStatus'
import { PaymentGatewayOwner } from '../Shared/PaymentGatewayOwner'
import { BuyerSupportResponsibility } from '../Shared/BuyerSupportResponsibility'

export class PromoterAgreement {
  constructor(
    public readonly id: Uuid,
    public readonly promoterId: Uuid,
    public readonly platformFeePercent: number,
    public readonly promoterFeePercent: number,
    public readonly paymentGatewayOwner: PaymentGatewayOwner,
    public readonly buyerSupportResponsibility: BuyerSupportResponsibility,
    public readonly isPromoterSelectable: boolean,
    public readonly status: PromoterAgreementStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

