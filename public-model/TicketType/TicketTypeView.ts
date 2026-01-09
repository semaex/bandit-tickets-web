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
    public readonly isPublished: boolean,
    public readonly isSoldOut: boolean,
  ) {}
}

