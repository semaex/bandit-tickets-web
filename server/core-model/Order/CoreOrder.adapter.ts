import { CoreOrder } from './CoreOrder'
import { CoreOrderBuyerInfo } from './CoreOrderBuyerInfo'
import { CoreOrderItem } from './CoreOrderItem'
import { CoreOrderStatus } from './CoreOrderStatus'
import { Uuid } from '../../../shared/Uuid'
import { Money } from '../../../shared/Money'
import { CountryCode } from '../../../shared/CountryCode'
import { CoreBuyerGender } from '../Buyer/CoreBuyerGender'

export interface CoreOrderItemJson {
  id: string
  eventId: string
  ticketTypeId: string
  quantity: number
  unitBase: { amount: number, currency: string }
  unitFee: { amount: number, currency: string }
  unitTotal: { amount: number, currency: string }
  base: { amount: number, currency: string }
  fee: { amount: number, currency: string }
  total: { amount: number, currency: string }
  createdAt: string
  updatedAt: string
}

export interface CoreOrderBuyerInfoJson {
  firstName: string | null
  lastName: string | null
  countryCode: string | null
  postalCode: string | null
  gender: string | null
  birthdate: string | null
  deviceUserAgent: string | null
  deviceType: string | null
  deviceOs: string | null
  deviceBrowser: string | null
}

export interface CoreOrderJson {
  id: string
  eventId: string
  buyerId: string
  status: string
  buyerInfo: CoreOrderBuyerInfoJson
  baseAmount: { amount: number, currency: string }
  buyerFeeAmount: { amount: number, currency: string }
  totalAmount: { amount: number, currency: string }
  promoterAgreementId: string
  expiresAt: string
  items: CoreOrderItemJson[]
  createdAt: string
  updatedAt: string
}

export function coreOrderFromCoreApiAdapter(json: CoreOrderJson): CoreOrder {
  return new CoreOrder(
    Uuid.fromString(json.id),
    Uuid.fromString(json.eventId),
    Uuid.fromString(json.buyerId),
    json.status as CoreOrderStatus,
    new CoreOrderBuyerInfo(
      json.buyerInfo.firstName,
      json.buyerInfo.lastName,
      json.buyerInfo.countryCode ? CountryCode.fromString(json.buyerInfo.countryCode) : null,
      json.buyerInfo.postalCode,
      json.buyerInfo.gender ? (json.buyerInfo.gender as CoreBuyerGender) : null,
      json.buyerInfo.birthdate ? new Date(json.buyerInfo.birthdate) : null,
      json.buyerInfo.deviceUserAgent,
      json.buyerInfo.deviceType,
      json.buyerInfo.deviceOs,
      json.buyerInfo.deviceBrowser
    ),
    Money.fromArray(json.baseAmount),
    Money.fromArray(json.buyerFeeAmount),
    Money.fromArray(json.totalAmount),
    Uuid.fromString(json.promoterAgreementId),
    new Date(json.expiresAt),
    json.items.map(item => new CoreOrderItem(
      Uuid.fromString(item.id),
      Uuid.fromString(item.eventId),
      Uuid.fromString(item.ticketTypeId),
      item.quantity,
      Money.fromArray(item.unitBase),
      Money.fromArray(item.unitFee),
      Money.fromArray(item.unitTotal),
      Money.fromArray(item.base),
      Money.fromArray(item.fee),
      Money.fromArray(item.total),
      new Date(item.createdAt),
      new Date(item.updatedAt)
    )),
    new Date(json.createdAt),
    new Date(json.updatedAt)
  )
}
