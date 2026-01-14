import { Email } from '../../shared/Email'
import { createCoreBuyer, findCoreBuyerByEmail, updateCoreBuyer } from '../core-model/Buyer/CoreBuyer.services'
import { createCoreOrder } from '../core-model/Order/CoreOrder.services'
import { Uuid } from '../../shared/Uuid'
import { handleApiError } from '../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { buyer: buyerInput, items, eventId, orderId, deviceUserAgent } = body
    
    if (!buyerInput || !buyerInput.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing buyer information'
      })
    }

    const email = Email.fromString(buyerInput.email).value()
    const buyerData = {
      firstName: buyerInput.firstName,
      lastName: buyerInput.lastName,
      countryCode: buyerInput.countryCode,
      postalCode: buyerInput.postalCode,
      birthdate: buyerInput.birthdate,
      gender: buyerInput.gender,
      marketingOptIn: !!buyerInput.marketingOptIn,
      locale: buyerInput.locale
    }

    let buyerId: string | null = null
    let buyerJustCreated = false

    // Step A — Search buyer
    try {
      const buyer = await findCoreBuyerByEmail(email)
      buyerId = buyer.id.value()
    } catch (error: any) {
      if (error.statusCode === 404) {
        // Not found, proceed to create
      } else {
        throw error
      }
    }

    // Step B — Create buyer if not found
    if (!buyerId) {
      buyerId = Uuid.random().value()
      try {
        await createCoreBuyer({
          id: buyerId,
          email: email, 
          emailNormalized: email,
          ...buyerData
        })
        buyerJustCreated = true
      } catch (error: any) {
        if (error.statusCode === 409) {
          const buyer = await findCoreBuyerByEmail(email)
          buyerId = buyer.id.value()
        } else {
          throw error
        }
      }
    }

    // Step C — Update buyer (PUT partial)
    // Only if not recently created and has fields to update
    if (!buyerJustCreated) {
      const updateData: any = {}
      
      for (const [key, value] of Object.entries(buyerData)) {
        if (value !== undefined && value !== null && value !== '') {
          updateData[key] = value
        }
      }

      if (Object.keys(updateData).length > 0) {
        await updateCoreBuyer(buyerId, updateData)
      }
    }

    // Step D — Create Order
    await createCoreOrder({
      id: orderId,
      eventId: eventId,
      buyerId: buyerId,
      lines: items,
      buyerInfo: {
        firstName: buyerData.firstName,
        lastName: buyerData.lastName,
        countryCode: buyerData.countryCode,
        postalCode: buyerData.postalCode,
        gender: buyerData.gender,
        birthdate: buyerData.birthdate
      },
      deviceUserAgent: deviceUserAgent
    })

    setResponseStatus(event, 201)
    return {
      orderId: orderId
    }

  } catch (error: any) {
    handleApiError(error)
  }
})
