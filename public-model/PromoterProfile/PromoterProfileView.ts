import { Uuid } from '../../shared/Uuid'
import { Address } from '../../shared/Address'
import { CorePromoterProfileEntityType } from '../../server/core-model/PromoterProfile/CorePromoterProfileEntityType'

export class PromoterProfileView {
  constructor(
    public readonly id: Uuid,
    public readonly promoterId: Uuid,
    public readonly entityType: CorePromoterProfileEntityType,
    public readonly brandName: string,
    public readonly logoImage: string | null,
    public readonly legalName: string,
    public readonly taxId: string,
    public readonly address: Address | null
  ) {}
}

