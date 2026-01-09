import { Uuid } from '../../../shared/Uuid'
import { CorePromoterAgreementStatus } from './CorePromoterAgreementStatus'
import { PaymentGatewayOwner } from '../../../shared/PaymentGatewayOwner'
import { BuyerSupportResponsibility } from '../../../shared/BuyerSupportResponsibility'

export class CorePromoterAgreement {
  constructor(
    public readonly id: Uuid,
    public readonly promoterId: Uuid,
    public readonly platformFeePercent: number,
    public readonly promoterFeePercent: number,
    public readonly paymentGatewayOwner: PaymentGatewayOwner,
    public readonly buyerSupportResponsibility: BuyerSupportResponsibility,
    public readonly isPromoterSelectable: boolean,
    public readonly status: CorePromoterAgreementStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

