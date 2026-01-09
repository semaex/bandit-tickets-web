import { ticketTypeViewFromCoreTicketTypeAdapter, ticketTypeViewToJson } from '../../../../public-model/TicketType/TicketTypeView.adapter'
import { handleCoreApiCall } from '../../../api-client/core'
import { getRouterParamOrFail } from '../../../utils/params'
import { findCoreTicketTypesByEvent } from "../../../core-model/TicketType/CoreTicketType.services"

export default defineEventHandler(async (event) => {
  const eventId = getRouterParamOrFail(event, 'eventId')

  return handleCoreApiCall(async () => {

    const coreTicketTypes = await findCoreTicketTypesByEvent(eventId)
    const ticketTypeViews = coreTicketTypes.map(ticketTypeViewFromCoreTicketTypeAdapter)
    return ticketTypeViews.map(ticketTypeViewToJson)
  }, 'fetch ticket types from core')
})

