<template>
  <div class="SaleStatus">
    <div :class="['SaleStatus-badge', `SaleStatus-badge--${status}`]">
      <span :class="['SaleStatus-dot', `SaleStatus-dot--${status}`]"></span>
      <span class="SaleStatus-label">{{ statusConfig.label }}</span>
    </div>
    
    <div v-if="(openDate || closeDate) && showDates" class="SaleStatus-dates">
      <p v-if="openDate && status === 'coming-soon'" class="SaleStatus-date">
        Apertura: {{ openDate }}
      </p>
      <p v-if="closeDate && status === 'on-sale'" class="SaleStatus-date">
        Cierre de ventas: {{ closeDate }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  status: 'on-sale' | 'coming-soon' | 'closed'
  openDate?: string
  closeDate?: string
  showDates?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDates: true
})

const statusConfig = computed(() => {
  switch (props.status) {
    case 'on-sale':
      return {
        label: 'Entradas a la venta',
        bgClass: 'SaleStatus-badge--on-sale',
        textClass: 'SaleStatus-label--on-sale',
        dotClass: 'SaleStatus-dot--on-sale'
      }
    case 'coming-soon':
      return {
        label: 'Próximamente',
        bgClass: 'SaleStatus-badge--coming-soon',
        textClass: 'SaleStatus-label--coming-soon',
        dotClass: 'SaleStatus-dot--coming-soon'
      }
    case 'closed':
      return {
        label: 'Ventas cerradas',
        bgClass: 'SaleStatus-badge--closed',
        textClass: 'SaleStatus-label--closed',
        dotClass: 'SaleStatus-dot--closed'
      }
  }
})
</script>

<style lang="scss">
.SaleStatus {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  &-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-full);

    &--on-sale {
      background-color: var(--color-primary-light);
    }

    &--coming-soon,
    &--closed {
      background-color: var(--color-secondary);
    }
  }

  &-dot {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);

    &--on-sale {
      background-color: var(--color-primary);
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    &--coming-soon,
    &--closed {
      background-color: var(--color-muted-foreground);
    }
  }

  &-label {
    font-size: 0.875rem;
    font-weight: 600;

    &--on-sale {
      color: var(--color-primary);
    }

    &--coming-soon,
    &--closed {
      color: var(--color-muted-foreground);
    }
  }

  &-dates {
    font-size: 0.75rem;
    color: var(--color-muted-foreground);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &-date {
    margin: 0;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>

