<template>
<div
  class="ui-button"
  :class="[colorClass, iconClass, disabledClass]"
  @click.stop="click"
>
  <ui-circle-loader v-if="loading"/>
  <slot v-if="!icon && !loading" />
  <mdicon v-if="icon && !loading" :name="icon" />
</div>
</template>

<script>
import UiCircleLoader from '@/components/ui/UiCircleLoader.vue';

export default {
  name: 'UiButton',
  components: { UiCircleLoader },
  props: {
    color: {
      type: String,
      default: 'prime',
      require: false,
      validate: (val) => ['prime', 'green', 'red', 'gray'].includes(val),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  computed: {
    colorClass() {
      return `ui-button--color-${this.color}`;
    },
    iconClass() {
      return this.icon ? 'ui-button--icon' : '';
    },
    disabledClass() {
      return this.disabled ? 'ui-button--disabled' : '';
    },
  },
  methods: {
    click() {
      if (!this.disabled) {
        this.$emit('click');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  border: 2px solid;
  font-size: 1rem;
  letter-spacing: .05rem;
  text-transform: capitalize;
  padding: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition-duration: $transition-delay;
  &--icon {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    border: none;
    padding: 0;
    justify-content: center;
  }
  &--color-prime {
    border-color: $color-prime;
    color: $color-prime;
    &:hover {
      background: change-color($color-prime, $alpha: 0.2);
    }
  }
  &--color-green {
    border-color: $color-green-2;
    color: $color-green-2;
    &:hover {
      background: change-color($color-green-2, $alpha: 0.2);
    }
  }
  &--color-gray {
    border-color: $color-gray-1;
    color: $color-gray-1;
    &:hover {
      background: change-color($color-gray-1, $alpha: 0.2);
    }
  }
  &--color-red {
    border-color: $color-red-1;
    color: $color-red-1;
    &:hover {
      background: change-color($color-red-1, $alpha: 0.2);
    }
  }
  &--disabled {
    cursor: default;
    opacity: 0.5;
    &:hover {
      background: white;
    }
  }
}
</style>
