import { Uuid } from '../../shared/Uuid'
import { StringMultilanguage } from '../../shared/StringMultilanguage'
import { Money } from '../../shared/Money'

export class TicketTypeView {
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
}

