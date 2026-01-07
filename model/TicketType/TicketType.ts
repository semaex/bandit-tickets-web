import { Uuid } from '../Shared/Uuid'
import { StringMultilanguage } from '../Shared/StringMultilanguage'
import { Money } from '../Shared/Money'

export class TicketType {
  constructor(
    public readonly id: Uuid,
    public readonly eventId: Uuid,
    public readonly name: StringMultilanguage | null,
    public readonly description: StringMultilanguage | null,
    public readonly price: Money | null,
    public readonly salesStock: number | null,
    public readonly invitationsStock: number,
    public readonly isPublished: boolean,
    public readonly isSoldOut: boolean,
    public readonly enabledFrom: Date | null,
    public readonly enabledTo: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  get available(): boolean {
    if (!this.isPublished) return false
    if (this.isSoldOut) return false
    if (this.salesStock !== null && this.salesStock <= 0) return false
    if (this.enabledFrom && new Date() < this.enabledFrom) return false
    if (this.enabledTo && new Date() > this.enabledTo) return false
    return true
  }
}

