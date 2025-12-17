<template>
  <div class="EventInfo">
    <div class="EventInfo-item">
      <svg class="EventInfo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span class="EventInfo-text EventInfo-text--bold">{{ date }}</span>
    </div>
    
    <div class="EventInfo-item">
      <svg class="EventInfo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="EventInfo-text">{{ time }}</span>
    </div>
    
    <div class="EventInfo-item">
      <svg class="EventInfo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <div class="EventInfo-venue">
        <span class="EventInfo-text EventInfo-text--bold">{{ venue }}</span>
        <span class="EventInfo-text EventInfo-text--muted"> · {{ city }}</span>
      </div>
    </div>
    
    <div class="EventInfo-item">
      <svg class="EventInfo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span class="EventInfo-text EventInfo-text--muted EventInfo-text--small">
        Organizado por {{ promoter }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  date: string
  time: string
  venue: string
  city: string
  promoter: string
}

defineProps<Props>()
</script>

<style lang="scss">
.EventInfo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    color: var(--color-foreground);
  }

  &-icon {
    width: 20px;
    height: 20px;
    color: var(--color-primary);
    flex-shrink: 0;
  }

  &-text {
    font-size: 1rem;
    color: var(--color-foreground);

    &--bold {
      font-weight: 600;
    }

    &--muted {
      color: var(--color-muted-foreground);
    }

    &--small {
      font-size: 0.875rem;
    }
  }

  &-venue {
    display: flex;
    align-items: center;
  }
}
</style>

