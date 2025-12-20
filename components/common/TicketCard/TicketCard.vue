<template>
  <div class="TicketCard">
    <div class="TicketCard-content">
      <div class="TicketCard-info">
        <h3 class="TicketCard-name">{{ name }}</h3>
        <p v-if="description" class="TicketCard-description">{{ description }}</p>
        <p class="TicketCard-price">{{ formattedPrice }}</p>
      </div>

      <div v-if="available" class="TicketCard-controls">
        <div class="TicketCard-quantity">
          <button
            class="TicketCard-button"
            :disabled="quantity === 0"
            @click="handleDecrease"
            :aria-label="trans('ticketCard.decrease_quantity')"
          >
            <svg class="TicketCard-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
          </button>
          <span class="TicketCard-quantity-value">{{ quantity }}</span>
          <button
            class="TicketCard-button"
            :disabled="quantity >= maxQuantity"
            @click="handleIncrease"
            :aria-label="trans('ticketCard.increase_quantity')"
          >
            <svg class="TicketCard-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
      <span v-else class="TicketCard-unavailable">{{ trans('ticketCard.sold_out') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppLanguage } from '../../../composables/useAppLanguage'
import ticketCardTranslations from './ticket-card.i18n.json'
import { translationService } from '../../../services/translation.service'

// Load translations
translationService.addTranslations('ticketCard', ticketCardTranslations)

// Use translation composable
const { trans } = useAppLanguage()

interface Props {
  name: string
  description?: string
  price: number
  quantity: number
  maxQuantity?: number
  available: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxQuantity: 10
})

const emit = defineEmits<{
  'quantity-change': [quantity: number]
}>()

const formattedPrice = computed(() => {
  return `${props.price.toFixed(2)} €`
})

const handleDecrease = () => {
  if (props.quantity > 0) {
    emit('quantity-change', props.quantity - 1)
  }
}

const handleIncrease = () => {
  if (props.quantity < props.maxQuantity) {
    emit('quantity-change', props.quantity + 1)
  }
}
</script>

<style lang="scss">
.TicketCard {
  background-color: var(--color-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--color-primary-light-20);
    box-shadow: var(--shadow-md);
  }

  &-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--spacing-md);
  }

  &-info {
    flex: 1;
    min-width: 0;
  }

  &-name {
    font-weight: 600;
    color: var(--color-foreground);
    margin: 0 0 var(--spacing-xs) 0;
  }

  &-description {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    margin: var(--spacing-xs) 0;
  }

  &-price {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-primary);
    margin: var(--spacing-sm) 0 0 0;
  }

  &-controls {
    display: flex;
    align-items: center;
  }

  &-quantity {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    background-color: var(--color-secondary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xs);
  }

  &-button {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    color: var(--color-foreground);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background-color var(--transition-base);

    &:hover:not(:disabled) {
      background-color: var(--color-border);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &-icon {
    width: 16px;
    height: 16px;
  }

  &-quantity-value {
    width: 24px;
    text-align: center;
    font-weight: 600;
    color: var(--color-foreground);
  }

  &-unavailable {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    font-weight: 500;
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: var(--color-secondary);
    border-radius: var(--radius-lg);
  }
}
</style>

