import { handleCoreApiCall } from '../../../api-client/core'
import { getRouterParamOrFail } from '../../../utils/params'
import { getQuery } from 'h3'
import { searchEventsByArtist } from '../../../core-model/Event/CoreEvent.services'
import { Criteria } from '../../../../shared/Criteria'
import {
  eventListViewFromCoreEventAdapter,
  eventListViewToJson,
  type EventListPage
} from '../../../../public-model/Event/EventListView.adapter'
import { paginationAdapter } from '../../../../shared/Pagination'
import { aggregateEventData } from '../aggregateEventData'

const DEFAULT_LIMIT = 20
const MAX_LIMIT = 100

export default defineEventHandler(async (event): Promise<EventListPage> => {
  const artistId = getRouterParamOrFail(event, 'artistId')
  const query = getQuery(event)
  const page = Math.max(1, parseInt(String(query.page ?? 1), 10) || 1)
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(String(query.limit ?? DEFAULT_LIMIT), 10) || DEFAULT_LIMIT))
  const offset = (page - 1) * limit

  return handleCoreApiCall(async (): Promise<EventListPage> => {
    const criteria = new Criteria([], null, offset, limit)
    const result = await searchEventsByArtist(artistId, criteria)

    const { venueById, ticketTypesByEventId } = await aggregateEventData(result.items)

    return paginationAdapter(result, (coreEvent) =>
      eventListViewToJson(eventListViewFromCoreEventAdapter(coreEvent, {
        venue: coreEvent.venueId ? (venueById.get(coreEvent.venueId.toString()) ?? null) : null,
        fromPrice: (() => {
          const ticketTypes = ticketTypesByEventId.get(coreEvent.id.toString()) ?? []
          const available = ticketTypes.filter(tt => tt.available && tt.price)
          const candidates = available.length ? available : ticketTypes.filter(tt => tt.isPublished && tt.price)
          if (!candidates.length) return null
          return candidates.reduce((min, tt) => (min === null || (tt.price && tt.price.lessThan(min)) ? tt.price! : min), null as any)
        })()
      }))
    )
  }, 'fetch upcoming events by artist')
})
