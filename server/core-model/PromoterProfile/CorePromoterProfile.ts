import { Uuid } from '../../../shared/Uuid'
import { Url } from '../../../shared/Url'
import { Email } from '../../../shared/Email'
import { PhoneNumber } from '../../../shared/PhoneNumber'
import { BuyerFeeMode } from '../../../shared/BuyerFeeMode'
import { StringMultilanguage } from '../../../shared/StringMultilanguage'
import { CorePromoterProfileEntityType } from './CorePromoterProfileEntityType'

export class CorePromoterProfile {
  constructor(
    public readonly id: Uuid,
    public readonly promoterId: Uuid,
    public readonly description: string | null,
    public readonly entityType: CorePromoterProfileEntityType,
    public readonly brandName: string,
    public readonly logoImage: string | null,
    public readonly logoImageUrl: Url | null,
    public readonly legalName: string,
    public readonly taxId: string,
    public readonly address: Record<string, any> | null,
    public readonly supportEmail: Email | null,
    public readonly supportPhone: PhoneNumber | null,
    public readonly terms: StringMultilanguage | null,
    public readonly defaultBuyerFeeMode: BuyerFeeMode | null,
    public readonly defaultPromoterAgreementId: Uuid | null,
    public readonly forcedPromoterAgreementId: Uuid | null,
    public readonly paymentGatewaySettings: Record<string, any> | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

