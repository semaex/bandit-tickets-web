import { CorePromoterAgreement } from './CorePromoterAgreement'
import { Uuid } from '../../../shared/Uuid'
import { CorePromoterAgreementStatus } from './CorePromoterAgreementStatus'
import { PaymentGatewayOwner } from '../../../shared/PaymentGatewayOwner'
import { BuyerSupportResponsibility } from '../../../shared/BuyerSupportResponsibility'

export interface CorePromoterAgreementJson {
  id: string
  promoterId: string
  platformFeePercent: number
  promoterFeePercent: number
  paymentGatewayOwner: string
  buyerSupportResponsibility: string
  isPromoterSelectable: boolean
  status: string
  createdAt: string
  updatedAt: string
}

export function corePromoterAgreementFromJson(json: CorePromoterAgreementJson): CorePromoterAgreement {
  return new CorePromoterAgreement(
    Uuid.fromString(json.id),
    Uuid.fromString(json.promoterId),
    json.platformFeePercent,
    json.promoterFeePercent,
    json.paymentGatewayOwner as PaymentGatewayOwner,
    json.buyerSupportResponsibility as BuyerSupportResponsibility,
    json.isPromoterSelectable,
    json.status as CorePromoterAgreementStatus,
    new Date(json.createdAt),
    new Date(json.updatedAt)
  )
}

