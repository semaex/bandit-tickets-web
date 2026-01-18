<template>
  <EventPage :slug="slug" />
</template>

<script setup lang="ts">
import EventPage from '../../components/pages/event/EventPage.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
</script>

