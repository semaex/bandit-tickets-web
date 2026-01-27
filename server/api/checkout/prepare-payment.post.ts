import { createCorePaymentAttemptForOrder, findCorePaymentAttemptById, markCorePaymentAttemptAsProcessing } from '../../core-model/Payment/CorePaymentAttempt.services'
import { findCorePaymentGatewayCheckoutConfig } from '../../core-model/PaymentGateway/CorePaymentGateway.services'
import { handleApiError } from '../../utils/errors'
import { PaymentGatewayProvider } from '../../../shared/PaymentGatewayProvider'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { orderId, paymentAttemptId } = body

    if (!orderId || !paymentAttemptId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: orderId and paymentAttemptId'
      })
    }

    // Step 1: Create payment attempt for order
    await createCorePaymentAttemptForOrder(paymentAttemptId, orderId)

    // Step 2: Find the payment attempt to get paymentGatewayId and amount
    const attempt = await findCorePaymentAttemptById(paymentAttemptId)
    const paymentGatewayId = attempt.paymentGatewayId.value()
    const amount = attempt.amount.toArray()

    // Step 3: Get checkout config from payment gateway
    const paymentGatewayConfig = await findCorePaymentGatewayCheckoutConfig(
      paymentGatewayId,
      paymentAttemptId,
      amount
    )

    if (paymentGatewayConfig.provider === PaymentGatewayProvider.REDSYS) {
      await markCorePaymentAttemptAsProcessing(paymentAttemptId)
    }

    return {
      paymentAttemptId,
      paymentGatewayId,
      paymentGatewayConfig
    }

  } catch (error: any) {
    handleApiError(error)
  }
})
