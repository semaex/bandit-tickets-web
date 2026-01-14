<template>
  <div class="Notifications">
    <notifications
      position="top center"
      classes="VueNotification"
      :duration="3000"
      :speed="200"
      :close-on-click="true"
    >
      <template #body="props">
        <div :class="['Notifications-item', props.item.type || 'info']">
          <div class="Notifications-item-inner">
            <div class="Notifications-item-title" v-if="props.item.title">
              {{ props.item.title }}
            </div>
            <div class="Notifications-item-text" v-html="props.item.text">
            </div>
          </div>
          <div class="Notifications-item-close" @click="props.close">
            <IconButton icon="close" />
          </div>
        </div>
      </template>
    </notifications>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconButton from "../../ui/icon-button/IconButton.vue"

export default defineComponent({
  name: "ToastNotifications",
  components: {IconButton}
})
</script>

<style lang="scss">
:root {
  --color-notification-success-text: #155724;
  --color-notification-success-background: #d4edda;
  --color-notification-success-border: #c3e6cb;
  --color-notification-info-text: #004085;
  --color-notification-info-background: #cce5ff;
  --color-notification-info-border: #b8daff;
  --color-notification-error-text: #721c24;
  --color-notification-error-background: #f8d7da;
  --color-notification-error-border: #f5c6cb;
}

.theme-dark {
  .Notifications {
    --color-notification-success-text: #e8f5e8;
    --color-notification-success-background: #1a4d2a;
    --color-notification-success-border: #0f3d1a;
    --color-notification-info-text: #e8f0f8;
    --color-notification-info-background: #1a3a5c;
    --color-notification-info-border: #001a33;
    --color-notification-error-text: #f8e8e8;
    --color-notification-error-background: #5c1a1f;
    --color-notification-error-border: #4a1519;
  }
}

.Notifications {
  &-item {
    margin-top: 1em;
    border: 1px solid transparent;
    border-radius: var(--radius-md, 8px);
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    font-size: 14px;

    &-inner {
      flex: 1;
      padding: .7em 1.3em;
    }

    &-close {
      margin: 5px;
    }

    &-title {
      margin-bottom: 0.5em;
      font-weight: bold;
    }

    &.success {
      color: var(--color-notification-success-text);
      background-color: var(--color-notification-success-background);
      border-color: var(--color-notification-success-border);
    }

    &.info {
      color: var(--color-notification-info-text);
      background-color: var(--color-notification-info-background);
      border-color: var(--color-notification-info-border);
    }

    &.error {
      color: var(--color-notification-error-text);
      background-color: var(--color-notification-error-background);
      border-color: var(--color-notification-error-border);
    }
  }
}
</style>
