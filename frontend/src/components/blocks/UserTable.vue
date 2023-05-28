<template>
<div class="user-table">
  <div class="user-table__wrapper">
    <ui-table
      :headers="headers"
      :items="items"
    >
      <template #default="{item}">
        <td style="width: 30%">
          {{ item.family }}
        </td>
        <td style="width: 30%">
          {{ item.name }}
        </td>
        <td style="width: 30%">
          {{ dayjs(item.birthday).format('DD.MM.YYYY') }}
        </td>
        <td style="width: 10%">
          <div class="row-btns">
            <ui-button
              icon="pencil"
              @click="$emit('edit', item)"
            ></ui-button>
            <ui-button
              color="red"
              icon="delete"
              @click="$emit('delete', item)"
            ></ui-button>
          </div>
        </td>
      </template>
    </ui-table>
  </div>
  <ui-pagination
    v-if="items.length"
    class="user-table__pagination"
    :items-per-page="3"
    :total-items="totalItems"
    :page="page"
    @paginate="$emit('paginate', $event)"
  />
</div>
</template>

<script>
import UiTable from '@/components/ui/UiTable.vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiPagination from '@/components/ui/UiPagination.vue';
import dayjs from 'dayjs';

export default {
  name: 'UserTable',
  computed: {
    dayjs() {
      return dayjs;
    },
  },
  components: { UiPagination, UiButton, UiTable },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    totalItems: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      headers: [
        'Фамилия',
        'Имя',
        'Дата рождения',
        '',
      ],
    };
  },
  methods: {
    loadUsers() {

    },
  },
};
</script>

<style lang="scss" scoped>
.user-table {
  &__wrapper {
    overflow: scroll;
  }
  &__pagination {
    margin-top: 8px;
  }
}
.row-btns {
  display: flex;
}
</style>
