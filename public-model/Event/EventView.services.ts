import type { EventView } from './EventView'
import type { EventViewJson } from './EventView.adapter'
import { eventViewFromJson } from './EventView.adapter'
import { bffApiClient } from '../../server/api-client/bff'

export async function findEventViewBySlug(slug: string): Promise<EventView> {
  const eventViewJson = await bffApiClient.get<EventViewJson>(`/events/${slug}`)
  return eventViewFromJson(eventViewJson)
}

