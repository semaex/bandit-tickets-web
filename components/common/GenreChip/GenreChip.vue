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
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-card);
  color: var(--color-foreground);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 400;
  box-shadow: var(--shadow-sm);
  transition: background-color var(--transition-base);

  &:hover {
    background-color: var(--color-secondary);
  }
}
</style>

