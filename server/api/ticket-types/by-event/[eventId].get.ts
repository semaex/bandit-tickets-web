import { coreTicketTypeFromJson, type CoreTicketTypeJson } from '../../../core-model/TicketType/CoreTicketType.adapter'
import { ticketTypeViewFromCoreTicketTypeAdapter, ticketTypeViewToJson } from '../../../../public-model/TicketType/TicketTypeView.adapter'
import { coreApiClient, handleCoreApiCall } from '../../../api-client/core'
import { getRouterParamOrFail } from '../../../utils/params'

const BASE_URL = '/api/v1/catalog/ticket-types'

export default defineEventHandler(async (event) => {
  const eventId = getRouterParamOrFail(event, 'eventId')

  return handleCoreApiCall(async () => {
    const response = await coreApiClient.get<{ ticketTypes: CoreTicketTypeJson[] }>(`${BASE_URL}/by-event/${eventId}`)

    const coreTicketTypes = response.ticketTypes.map(coreTicketTypeFromJson)
    const ticketTypeViews = coreTicketTypes.map(ticketTypeViewFromCoreTicketTypeAdapter)
    return ticketTypeViews.map(ticketTypeViewToJson)
  }, 'fetch ticket types from core')
})

