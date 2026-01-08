import { PromoterAgreement } from './PromoterAgreement'
import { Uuid } from '../Shared/Uuid'
import { PromoterAgreementStatus } from './PromoterAgreementStatus'
import { PaymentGatewayOwner } from '../Shared/PaymentGatewayOwner'
import { BuyerSupportResponsibility } from '../Shared/BuyerSupportResponsibility'

export interface ApiPromoterAgreement {
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

export function promoterAgreementFromApiAdapter(item: ApiPromoterAgreement): PromoterAgreement {
  return new PromoterAgreement(
    Uuid.fromString(item.id),
    Uuid.fromString(item.promoterId),
    item.platformFeePercent,
    item.promoterFeePercent,
    item.paymentGatewayOwner as PaymentGatewayOwner,
    item.buyerSupportResponsibility as BuyerSupportResponsibility,
    item.isPromoterSelectable,
    item.status as PromoterAgreementStatus,
    new Date(item.createdAt),
    new Date(item.updatedAt)
  )
}

