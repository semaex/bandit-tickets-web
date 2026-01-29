import type { EventPurchaseView } from './EventPurchaseView'
import type { EventPurchaseViewJson } from './EventPurchaseView.adapter'
import { eventPurchaseViewFromJson } from './EventPurchaseView.adapter'
import type { EventListPage } from './EventListView.adapter'
import { eventListViewFromJson } from './EventListView.adapter'
import { bffApiClient } from '../../server/api-client/bff'
import { paginationAdapter } from '../../shared/Pagination'
import type { Paginated } from '../../shared/Pagination'
import type { EventListView } from './EventListView'

export async function findEventPurchaseViewBySlug(slug: string): Promise<EventPurchaseView> {
  const eventPurchaseViewJson = await bffApiClient.get<EventPurchaseViewJson>(`/events/purchase-view/${slug}`)
  return eventPurchaseViewFromJson(eventPurchaseViewJson)
}

export interface UpcomingEventsOptions {
  page?: number
  limit?: number
}

export type EventListPageView = Paginated<EventListView>

export async function findUpcomingEventsByPromoter(
  promoterId: string,
  options: UpcomingEventsOptions = {}
): Promise<EventListPageView> {
  const { page = 1, limit = 20 } = options
  const pageData = await bffApiClient.get<EventListPage>(
    `/events/by-promoter/${promoterId}`,
    { page: String(page), limit: String(limit) }
  )
  return paginationAdapter(pageData, eventListViewFromJson)
}

export async function findUpcomingEventsByArtist(
  artistId: string,
  options: UpcomingEventsOptions = {}
): Promise<EventListPageView> {
  const { page = 1, limit = 20 } = options
  const pageData = await bffApiClient.get<EventListPage>(
    `/events/by-artist/${artistId}`,
    { page: String(page), limit: String(limit) }
  )
  return paginationAdapter(pageData, eventListViewFromJson)
}

