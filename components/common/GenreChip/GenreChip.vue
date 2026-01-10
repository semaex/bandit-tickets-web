<template>
  <span class="GenreChip">{{ translatedGenre }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppLocale } from '../../../composables/useAppLocale'

export default defineComponent({
  name: 'GenreChip',

  props: {
    genre: {
      type: String,
      required: true
    }
  },

  data () {
    const { trans } = useAppLocale()

    return {
      trans
    }
  },

  computed: {
    translatedGenre (): string {
      const genreKey = this.genre.toLowerCase().replace(/\s+/g, '_')
      const translation = this.trans(`musicGenres.${genreKey}`)
      return translation !== `musicGenres.${genreKey}`
        ? translation
        : this.genre
    }
  }
})
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
