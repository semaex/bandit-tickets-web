import { Uuid } from '../../../shared/Uuid'
import { Money } from '../../../shared/Money'
import { CoreOrderStatus } from './CoreOrderStatus'
import { CoreOrderBuyerInfo } from './CoreOrderBuyerInfo'
import { CoreOrderItem } from './CoreOrderItem'

export class CoreOrder {
  constructor(
    public readonly id: Uuid,
    public readonly eventId: Uuid,
    public readonly buyerId: Uuid,
    public readonly status: CoreOrderStatus,
    public readonly buyerInfo: CoreOrderBuyerInfo,
    public readonly baseAmount: Money,
    public readonly buyerFeeAmount: Money,
    public readonly totalAmount: Money,
    public readonly promoterAgreementId: Uuid,
    public readonly expiresAt: Date,
    public readonly items: CoreOrderItem[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
