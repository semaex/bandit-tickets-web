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

export interface CheckoutRequest {
  buyer: CheckoutBuyerRequest
  items: CheckoutItemRequest[]
  eventId: string
  orderId: string
  deviceUserAgent: string
}
