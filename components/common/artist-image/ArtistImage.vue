<template>
  <div class="ArtistImage">
    <div class="ArtistImage-wrap">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="alt"
        class="ArtistImage-img"
      />
      <div v-else class="ArtistImage-img ArtistImage-img-placeholder" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArtistImage',

  props: {
    imageUrl: {
      type: String,
      required: false,
      default: null
    },
    alt: {
      type: String,
      required: false,
      default: ''
    }
  }
})
</script>

<style lang="scss">
.ArtistImage {
  width: 100%;
  position: relative;

  &-wrap {
    padding-bottom: 60%;
    position: relative;
    overflow: hidden;
  }

  &-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    &-placeholder {
      background: var(--color-border);
    }
  }
}
</style>
