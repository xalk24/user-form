<template>
<div class="main-page">
  <ui-card
    class="table-card"
    style="margin-top: 16px"
  >
    <div class="table-card__button-wrapper">
      <ui-button
        @click="isDialogOpened = true"
      >
        Добавить
      </ui-button>
    </div>
    <UserTable
      :items="users"
      :total-items="totalUsers"
      :page="page"
      @paginate="loadUsers"
      @edit="openEditDialog"
      @delete="deleteUser"
    />
  </ui-card>
  <UserDialog
    v-model="isDialogOpened"
    :user="userToEdit"
    @user-saved="loadUsers(1)"
    @clear-user="userToEdit = null"
  />
</div>
</template>

<script>
import UiCard from '@/components/ui/UiCard.vue';
import UiButton from '@/components/ui/UiButton.vue';
import UserTable from '@/components/blocks/UserTable.vue';
import userApi from '@/api/user.api';
import UserDialog from '@/components/blocks/UserDialog.vue';

export default {
  name: 'MainPage',
  components: {
    UserDialog,
    UserTable,
    UiButton,
    UiCard,
  },
  created() {
    this.loadUsers(1);
  },
  data() {
    return {
      isDialogOpened: false,
      users: [],
      loading: false,
      totalUsers: 0,
      userToEdit: null,
      page: 1,
    };
  },
  methods: {
    async loadUsers(page) {
      if (this.userToEdit) {
        this.userToEdit = null;
      }
      this.page = page;
      this.loading = true;
      const result = await userApi.loadUsers(page);
      this.users = result.users;
      this.totalUsers = result.length;
      this.loading = false;
    },
    async deleteUser(user) {
      await userApi.deleteUser(user.id);
      await this.loadUsers(1);
    },
    openEditDialog(user) {
      this.userToEdit = user;
      this.isDialogOpened = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  max-width: 1024px;
  margin: 0 auto;
  .table-card {
    margin-top: 16px;
    &__button-wrapper {
      display: flex;
      margin-bottom: 8px;
      .ui-button {
        margin-left: auto;
      }
    }
    &__table-wrapper {
      overflow: scroll;
      padding-bottom: 12px;
    }
  }
}
</style>
