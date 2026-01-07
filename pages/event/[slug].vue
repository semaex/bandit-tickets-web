<template>
  <EventPage :slug="slug" />
</template>

<script setup lang="ts">
import EventPage from '../../components/pages/EventPage/EventPage.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
</script>

