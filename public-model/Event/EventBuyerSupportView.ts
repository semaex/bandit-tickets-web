import type { Email } from "../../shared/Email";
import type { BuyerSupportResponsibility } from "../../shared/BuyerSupportResponsibility"
import type { Uuid } from "../../shared/Uuid";

export class EventBuyerSupportView {
  constructor(
      public readonly eventId: Uuid,
      public readonly responsible: BuyerSupportResponsibility,
      public readonly name: string,
      public readonly email: Email | null
  ) {}
}

