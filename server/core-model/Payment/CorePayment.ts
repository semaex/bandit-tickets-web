import { Uuid } from '../../../shared/Uuid'
import { Money } from '../../../shared/Money'
import { CorePaymentStatus } from './CorePaymentStatus'
import { CorePaymentAttempt } from './CorePaymentAttempt'

export class CorePayment {
  constructor(
    public readonly id: Uuid,
    public readonly orderId: Uuid,
    public readonly payable: Money,
    public readonly status: CorePaymentStatus,
    public readonly gatewaySettled: Money | null,
    public readonly gatewayFee: Money | null,
    public readonly attempts: CorePaymentAttempt[],
    public readonly successfulAttemptId: Uuid | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
