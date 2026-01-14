import { Uuid } from '../../../shared/Uuid'
import { Money } from '../../../shared/Money'

export class CoreOrderItem {
  constructor(
    public readonly id: Uuid,
    public readonly eventId: Uuid,
    public readonly ticketTypeId: Uuid,
    public readonly quantity: number,
    public readonly unitBase: Money,
    public readonly unitFee: Money,
    public readonly unitTotal: Money,
    public readonly base: Money,
    public readonly fee: Money,
    public readonly total: Money,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
