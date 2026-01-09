import type { EventPurchaseView } from './EventPurchaseView'
import type { EventPurchaseViewJson } from './EventPurchaseView.adapter'
import { eventPurchaseViewFromJson } from './EventPurchaseView.adapter'
import { bffApiClient } from '../../server/api-client/bff'


export async function findEventPurchaseViewBySlug(slug: string): Promise<EventPurchaseView> {
  const eventPurchaseViewJson = await bffApiClient.get<EventPurchaseViewJson>(`/events/purchase-view/${slug}`)
  return eventPurchaseViewFromJson(eventPurchaseViewJson)
}

