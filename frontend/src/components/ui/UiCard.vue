<template>
<div class="ui-card">
  <slot />
</div>
</template>

<script>
export default {
  name: 'UiCard',
};
</script>

<style scoped>
.ui-card {
  padding: 8px;
  border: 1px solid #D6D5D5;
  border-radius: 4px;
}
</style>
