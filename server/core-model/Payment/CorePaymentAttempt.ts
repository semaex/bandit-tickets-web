import { Uuid } from '../../../shared/Uuid'
import { Money } from '../../../shared/Money'
import { PaymentGatewayOwner } from '../../../shared/PaymentGatewayOwner'
import { CorePaymentAttemptStatus } from './CorePaymentAttemptStatus'

export class CorePaymentAttempt {
  constructor(
    public readonly id: Uuid,
    public readonly paymentGatewayId: Uuid,
    public readonly gatewayOwner: PaymentGatewayOwner,
    public readonly amount: Money,
    public readonly status: CorePaymentAttemptStatus,
    public readonly gatewayTransactionId: string | null,
    public readonly gatewaySettlementAmount: Money | null,
    public readonly gatewayFee: Money | null,
    public readonly gatewayRawResponse: Record<string, any> | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
