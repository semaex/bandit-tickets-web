import { findCoreEventBySlug } from '../../core-model/Event/CoreEvent.services'
import { eventViewFromCoreEventAdapter, eventViewToJson } from '../../../public-model/Event/EventView.adapter'
import { handleCoreApiCall } from '../../api-client/core'
import { getRouterParamOrFail } from '../../utils/params'

export default defineEventHandler(async (event) => {
  const slug = getRouterParamOrFail(event, 'slug')

  return handleCoreApiCall(async () => {
    const coreEvent = await findCoreEventBySlug(slug)
    const eventView = eventViewFromCoreEventAdapter(coreEvent)
    return eventViewToJson(eventView)
  }, 'fetch event from core')
})

