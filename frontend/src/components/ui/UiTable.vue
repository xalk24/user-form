<template>
<div class="ui-table">
  <table>
    <thead>
      <tr class="head-row">
        <th
          v-for="(head, index) in headers"
          :key="index"
        >
          {{ head }}
        </th>
      </tr>
    </thead>
    <tbody>
    <tr v-if="loading">
      <td :colspan="headers.length">
        Загрузка данных
      </td>
    </tr>
    <tr v-if="!loading && items.length === 0">
      <td :colspan="headers.length">
        Данных нет
      </td>
    </tr>
    <template
      v-if="!loading && items.length > 0"
    >
      <tr
        v-for="item in items"
        :key="item.id"
      >
        <slot :item="item"></slot>
      </tr>
    </template>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  name: 'UiTable',
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-table {
  &__loader {
    width: 100%;
    height: 5px;
    background-color: green;
  }
  table {
    border-spacing: 0;
    border-radius: 16px;
    overflow: hidden;
    width: 100%;
  }
  .head-row {
    background: $color-prime;
    color: white;
    height: 60px;
    border-radius: 8px 8px 0 0;
    &:hover {
      background: $color-prime;
    }
    th {
      padding: 16px;
    }
  }
  tr {
    height: 40px;
    padding: 8px;
    background: $color-second;
    transition-duration: $transition-delay;
    text-align: center;
    &:nth-child(even) {
      background: white;
    }
  }
}
</style>
