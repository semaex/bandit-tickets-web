import { ref, computed } from 'vue'
import type { Money } from '../shared/Money'

export interface CartItem {
  ticketTypeId: string
  name: string
  price: Money
  quantity: number
}

export interface CheckoutData {
  items: CartItem[]
  quantities: Record<string, number>
  subtotal: Money
  serviceFee: Money
  total: Money
  eventSlug: string
  eventId: string
  eventTitle: string
  eventDate: string
  eventVenue: string
}

export interface PaymentData {
  success: boolean
  orderId?: string
  eventTitle?: string
  eventDate?: string
  eventVenue?: string
  items?: { name: string; quantity: number }[]
  email?: string
}

const checkoutData = ref<CheckoutData | null>(null)
const paymentData = ref<PaymentData | null>(null)

export const useCheckout = () => {
  const setCheckoutData = (data: CheckoutData) => {
    checkoutData.value = data
  }

  const getCheckoutData = () => {
    return checkoutData.value
  }

  const clearCheckoutData = () => {
    checkoutData.value = null
  }

  const setPaymentData = (data: PaymentData) => {
    paymentData.value = data
  }

  const getPaymentData = () => {
    return paymentData.value
  }

  const clearPaymentData = () => {
    paymentData.value = null
  }

  return {
    setCheckoutData,
    getCheckoutData,
    clearCheckoutData,
    setPaymentData,
    getPaymentData,
    clearPaymentData
  }
}

