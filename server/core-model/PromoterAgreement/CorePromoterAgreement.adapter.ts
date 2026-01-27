import { CorePromoterAgreement } from './CorePromoterAgreement'
import type { BanditFeeMode, BanditFeePolicy } from './CorePromoterAgreement'
import { Uuid } from '../../../shared/Uuid'
import { CorePromoterAgreementStatus } from './CorePromoterAgreementStatus'
import { PaymentGatewayOwner } from '../../../shared/PaymentGatewayOwner'
import { BuyerSupportResponsibility } from '../../../shared/BuyerSupportResponsibility'

export interface CorePromoterAgreementJson {
  id: string
  promoterId: string
  banditFeePolicy: {
    mode: string
    percent?: number | null
    percentFormatted?: string | null
    fixedAmount?: {
      amount: number
      currency: string
      formatted: string
    } | null
  }
  paymentGatewayOwner: string
  maxBuyerFeePercent: number
  maxBuyerFeePercentFormatted: string
  defaultBuyerFeePercent: number
  defaultBuyerFeePercentFormatted: string
  buyerSupportResponsibility: string
  isPromoterSelectable: boolean
  status: string
  createdAt: string
  updatedAt: string
}

export function corePromoterAgreementFromJson(json: CorePromoterAgreementJson): CorePromoterAgreement {
  // Map banditFeePolicy with proper type casting
  const banditFeePolicy: BanditFeePolicy = {
    mode: json.banditFeePolicy.mode as BanditFeeMode,
    percent: json.banditFeePolicy.percent,
    percentFormatted: json.banditFeePolicy.percentFormatted,
    fixedAmount: json.banditFeePolicy.fixedAmount
  }

  return new CorePromoterAgreement(
    Uuid.fromString(json.id),
    Uuid.fromString(json.promoterId),
    banditFeePolicy,
    json.paymentGatewayOwner as PaymentGatewayOwner,
    json.maxBuyerFeePercent,
    json.maxBuyerFeePercentFormatted,
    json.defaultBuyerFeePercent,
    json.defaultBuyerFeePercentFormatted,
    json.buyerSupportResponsibility as BuyerSupportResponsibility,
    json.isPromoterSelectable,
    json.status as CorePromoterAgreementStatus,
    new Date(json.createdAt),
    new Date(json.updatedAt)
  )
}

