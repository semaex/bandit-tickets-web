import { CorePayment } from './CorePayment'
import { CorePaymentAttempt } from './CorePaymentAttempt'
import { CorePaymentStatus } from './CorePaymentStatus'
import { CorePaymentAttemptStatus } from './CorePaymentAttemptStatus'
import { Uuid } from '../../../shared/Uuid'
import { Money } from '../../../shared/Money'
import { PaymentGatewayOwner } from '../../../shared/PaymentGatewayOwner'

export interface CorePaymentAttemptJson {
  id: string
  paymentGatewayId: string
  gatewayOwner: string
  amount: { amount: number, currency: string }
  status: string
  gatewayTransactionId: string | null
  gatewaySettlementAmount: { amount: number, currency: string } | null
  gatewayFee: { amount: number, currency: string } | null
  gatewayRawResponse: Record<string, any> | null
  createdAt: string
  updatedAt: string
}

export interface CorePaymentJson {
  id: string
  orderId: string
  payable: { amount: number, currency: string }
  status: string
  gatewaySettled: { amount: number, currency: string } | null
  gatewayFee: { amount: number, currency: string } | null
  attempts: CorePaymentAttemptJson[]
  successfulAttemptId: string | null
  createdAt: string
  updatedAt: string
}

export function corePaymentAttemptFromJson(json: CorePaymentAttemptJson): CorePaymentAttempt {
  return new CorePaymentAttempt(
    Uuid.fromString(json.id),
    Uuid.fromString(json.paymentGatewayId),
    json.gatewayOwner as PaymentGatewayOwner,
    Money.fromArray(json.amount),
    json.status as CorePaymentAttemptStatus,
    json.gatewayTransactionId,
    json.gatewaySettlementAmount ? Money.fromArray(json.gatewaySettlementAmount) : null,
    json.gatewayFee ? Money.fromArray(json.gatewayFee) : null,
    json.gatewayRawResponse,
    new Date(json.createdAt),
    new Date(json.updatedAt)
  )
}

export function corePaymentFromJson(json: CorePaymentJson): CorePayment {
  return new CorePayment(
    Uuid.fromString(json.id),
    Uuid.fromString(json.orderId),
    Money.fromArray(json.payable),
    json.status as CorePaymentStatus,
    json.gatewaySettled ? Money.fromArray(json.gatewaySettled) : null,
    json.gatewayFee ? Money.fromArray(json.gatewayFee) : null,
    json.attempts.map(attempt => corePaymentAttemptFromJson(attempt)),
    json.successfulAttemptId ? Uuid.fromString(json.successfulAttemptId) : null,
    new Date(json.createdAt),
    new Date(json.updatedAt)
  )
}
