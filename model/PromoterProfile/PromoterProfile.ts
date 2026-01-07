import { Uuid } from '../Shared/Uuid'
import { Url } from '../Shared/Url'
import { Email } from '../Shared/Email'
import { PhoneNumber } from '../Shared/PhoneNumber'
import { BuyerFeeMode } from '../Shared/BuyerFeeMode'
import { StringMultilanguage } from '../Shared/StringMultilanguage'
import { OrganizationType } from './OrganizationType'

export class PromoterProfile {
  constructor(
    public readonly id: Uuid,
    public readonly promoterId: Uuid,
    public readonly description: string | null,
    public readonly entityType: OrganizationType,
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


