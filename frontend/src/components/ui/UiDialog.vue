<template>
<div
  v-if="value"
>
  <div
    class="overlay"
    @click="closeDialog"
  ></div>
  <div
    v-if="!isMobile"
    class="ui-dialog"
    :style="{width: `${width}px`}"
  >
    <div class="ui-dialog__header">
      <p v-if="title" class="title">{{ title }}</p>
      <ui-button
        color="red"
        icon="close"
        @click="closeDialog"
      />
    </div>
    <slot />
  </div>
  <div class="ui-bottom-dialog" v-else>
    <div class="ui-bottom-dialog__header">
      <p v-if="title" class="title">{{ title }}</p>
      <ui-button
        color="red"
        icon="close"
        @click="closeDialog"
      />
    </div>
    <slot />
  </div>
</div>
</template>

<script>
import UiButton from '@/components/ui/UiButton.vue';
import IsMobileMixin from '@/mixins/IsMobileMixin';

export default {
  name: 'UiDialog',
  components: { UiButton },
  mixins: [IsMobileMixin],
  props: {
    title: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '600',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.$emit('dialog-opened');
      } else {
        this.$emit('dialog-closed');
      }
    },
  },
  methods: {
    closeDialog() {
      this.$emit('input', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: rgba(0,0,0,0.5);
}
.ui-dialog {
  position: absolute;
  z-index: 3;
  top: 25%;  /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translate(-50%, -50%);
  width: 650px;
  padding: 0 16px 16px 16px;
  min-height: 120px;
  background: white;
  border: 1px solid $color-second;
  &__header {
    padding-top: 16px;
    margin-bottom: 16px;
    display: flex;
    .title {
      font-size: 1.2rem;
      font-weight: 600;
    }
    .ui-button {
      margin-left: auto;
    }
  }
}
.ui-bottom-dialog {
  position: absolute;
  z-index: 3;
  min-height: 120px;
  width: 100%;
  bottom: 0;
  left: 0;
  border-radius: 8px 8px 0 0;
  padding: 0 8px 32px 8px;
  background: white;
  border: 1px solid $color-second;
  box-sizing: border-box;
  &__header {
    padding-top: 16px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    p {
      margin: 0;
    }
    .title {
      font-size: 1.2rem;
      font-weight: 600;
    }
    .ui-button {
      margin-left: auto;
    }
  }
}
</style>
