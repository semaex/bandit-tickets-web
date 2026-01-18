import { bffApiClient } from '../../server/api-client/bff'
import { PaymentGatewayProvider } from '../../shared/PaymentGatewayProvider'

export interface CheckoutBuyerRequest {
  email: string
  firstName: string
  lastName: string
  countryCode: string | null
  postalCode: string
  birthdate: string | null
  gender: string | null
  marketingOptIn: boolean
  locale: string
}

export interface CheckoutItemRequest {
  ticketTypeId: string
  quantity: number
}

export interface CheckoutCreateOrderRequest {
  buyer: CheckoutBuyerRequest
  items: CheckoutItemRequest[]
  eventId: string
  orderId: string
  deviceUserAgent: string
}

export async function checkoutCreateOrder(request: CheckoutCreateOrderRequest): Promise<void> {
  return await bffApiClient.post('/checkout/create-order', request)
}

export interface CheckoutPreparePaymentRequest {
  orderId: string
  paymentAttemptId: string
}

export interface RedsysPaymentGatewayConfig {
  provider: PaymentGatewayProvider.REDSYS
  actionUrl: string
  settings: {
    Ds_SignatureVersion: string
    Ds_MerchantParameters: string
    Ds_Signature: string
  }
}

export interface StripePaymentGatewayConfig {
  provider: PaymentGatewayProvider.STRIPE
  // TODO: Add Stripe-specific configuration fields when implementing Stripe support
  [key: string]: any
}

export type PaymentGatewayConfig = RedsysPaymentGatewayConfig | StripePaymentGatewayConfig

export interface CheckoutPreparePaymentResponse {
  paymentAttemptId: string
  paymentGatewayId: string
  paymentGatewayConfig: PaymentGatewayConfig
}

export async function checkoutPreparePayment(request: CheckoutPreparePaymentRequest): Promise<CheckoutPreparePaymentResponse> {
  return await bffApiClient.post<CheckoutPreparePaymentResponse>('/checkout/prepare-payment', request)
}
