<template>
  <div class="TicketCard">
    <div class="TicketCard-content">
      <div class="TicketCard-info">
        <h3 class="TicketCard-name">{{ name }}</h3>
        <p v-if="description" class="TicketCard-description">{{ description }}</p>
        <p class="TicketCard-price">{{ formattedPrice }}</p>
      </div>

      <div class="TicketCard-controls">
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppLocale } from '../../../composables/useAppLocale'
import { Money } from '../../../shared/Money'
import ticketCardTranslations from './ticket-card.i18n.json'
import { translationService } from '../../../services/translation.service'

translationService.addTranslations('ticketCard', ticketCardTranslations)

export default defineComponent({
  name: 'TicketCard',

  props: {
    name: { type: String, required: true },
    description: { type: String, required: false, default: undefined },
    price: { type: Object as () => Money, required: true },
    quantity: { type: Number, required: true },
    maxQuantity: { type: Number, required: false, default: 10 }
  },

  emits: ['quantity-change'],

  data () {
    const { trans } = useAppLocale()

    return {
      trans
    }
  },

  computed: {
    formattedPrice (): string {
      return this.price.formatted()
    }
  },

  methods: {
    handleDecrease () {
      if (this.quantity > 0) {
        this.$emit('quantity-change', this.quantity - 1)
      }
    },

    handleIncrease () {
      if (this.quantity < this.maxQuantity) {
        this.$emit('quantity-change', this.quantity + 1)
      }
    }
  }
})
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
}
</style>
