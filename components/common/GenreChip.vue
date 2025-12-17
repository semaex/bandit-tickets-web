<template>
  <span class="GenreChip">{{ genre }}</span>
</template>

<script setup lang="ts">
interface Props {
  genre: string
}

defineProps<Props>()
</script>

<style lang="scss">
.GenreChip {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-md);
  background-color: var(--color-secondary);
  color: var(--color-foreground);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color var(--transition-base);

  &:hover {
    background-color: var(--color-border);
  }
}
</style>

