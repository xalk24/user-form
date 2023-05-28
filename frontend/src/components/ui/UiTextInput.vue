<template>
<div class="ui-text-input">
  <div
    class="ui-text-input__label"
    :class="{'ui-text-input__label--active': isInputActive}"
  >
    {{ label }}
  </div>
  <input
    type="text"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @focus="isInputActive = true"
    @blur="isInputActive = false"
  />
  <div v-if="error" class="ui-text-input__error">
    {{ error }}
  </div>
</div>
</template>

<script>
export default {
  name: 'UiTextInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isInputActive: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.ui-text-input {
  position: relative;
  display: inline-block;
  padding-top: 10px;
  input[type='text'] {
    width: 250px;
    font-size: 1rem;
    padding: 12px;
    border: 1px solid $color-second;
    border-radius: 8px;
    outline: none;
    transition-duration: .5s;
    &:focus {
      border: 1px solid $color-prime;
    }
  }
  &__label {
    position: absolute;
    background: white;
    font-size: 0.7rem;
    top: 0;
    left: 8px;
    padding: 2px;
    transition-duration: .5s;
    &--active {
      color: $color-prime;
    }
  }
  &__error {
    text-align: left;
    color: $color-red-1;
    font-size: .7rem;
  }
}
</style>
