import type { EventView } from './EventView'
import type { EventViewJson } from './EventView.adapter'
import { eventViewFromJson } from './EventView.adapter'

export async function findEventViewBySlug(slug: string): Promise<EventView> {
  return $fetch<EventViewJson>(`/api/events/${slug}`).then((eventViewJson: EventViewJson) => {
    return eventViewFromJson(eventViewJson)
  })
}

