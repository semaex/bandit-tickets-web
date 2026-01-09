import { Uuid } from '../../shared/Uuid'

export class PromoterProfileView {
  constructor(
    public readonly id: Uuid,
    public readonly brandName: string
  ) {}
}

