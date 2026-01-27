import { Uuid } from '../../../shared/Uuid'
import { CorePromoterAgreementStatus } from './CorePromoterAgreementStatus'
import { PaymentGatewayOwner } from '../../../shared/PaymentGatewayOwner'
import { BuyerSupportResponsibility } from '../../../shared/BuyerSupportResponsibility'

export type BanditFeeMode = 'percent_per_ticket' | 'fixed_per_ticket' | 'fixed_per_event'

export interface BanditFeePolicy {
  mode: BanditFeeMode
  percent?: number | null // basis points
  percentFormatted?: string | null // e.g., "10.50%"
  fixedAmount?: {
    amount: number
    currency: string
    formatted: string
  } | null
}

export class CorePromoterAgreement {
  constructor(
    public readonly id: Uuid,
    public readonly promoterId: Uuid,
    public readonly banditFeePolicy: BanditFeePolicy,
    public readonly paymentGatewayOwner: PaymentGatewayOwner,
    public readonly maxBuyerFeePercent: number, // basis points
    public readonly maxBuyerFeePercentFormatted: string, // e.g., "10.00%"
    public readonly defaultBuyerFeePercent: number, // basis points
    public readonly defaultBuyerFeePercentFormatted: string, // e.g., "5.00%"
    public readonly buyerSupportResponsibility: BuyerSupportResponsibility,
    public readonly isPromoterSelectable: boolean,
    public readonly status: CorePromoterAgreementStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
