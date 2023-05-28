<template>
<ui-dialog
  :title="dialogTitle"
  width="400"
  :value="value"
  @dialog-opened="init"
  @dialog-closed="onClose"
  @input="$emit('input', $event)"
>
  <div class="user-form">
    <div class="user-form__input-wrapper">
      <ui-text-input
        label="Имя"
        placeholder="Иван"
        v-model="name"
      />
    </div>
    <div class="user-form__input-wrapper">
      <ui-text-input
        label="Фамилия"
        placeholder="Иванов"
        v-model="family"
        :error="familyError"
      />
    </div>
    <div class="user-form__input-wrapper">
      <ui-text-input
        label="Дата рождения"
        placeholder="ДД.ММ.ГГГГ"
        v-model="birthday"
        :error="birthdayError"
      />
    </div>
    <ui-button
      class="user-form__button"
      :loading="loading"
      :color="btnColor"
      :disabled="!btnActive"
      @click="save"
    >
      {{btnText}}
    </ui-button>
  </div>
</ui-dialog>
</template>

<script>
import UiDialog from '@/components/ui/UiDialog.vue';
import UiTextInput from '@/components/ui/UiTextInput.vue';
import UiButton from '@/components/ui/UiButton.vue';
import userApi from '@/api/user.api';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default {
  name: 'UserDialog',
  components: { UiButton, UiTextInput, UiDialog },
  props: {
    user: {
      type: Object,
      default: () => null,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    dayjs.extend(customParseFormat);
  },
  data() {
    return {
      userId: 0,
      name: '',
      family: '',
      birthday: '',
      btnColor: 'prime',
      btnText: 'Отправить',
      loading: false,
      editMode: false,
    };
  },
  computed: {
    familyError() {
      if (this.family === '') {
        return 'Поле обязательно для заполнения';
      }
      if (!/[а-яА-ЯЁё]/.test(this.family)) {
        return 'Фамилия должна состоять из русских букв!';
      }
      return '';
    },
    birthdayError() {
      if (this.birthday === '') {
        return 'Поле обязательно для заполнения';
      }
      if (!/\d\d.\d\d.\d\d\d\d/.test(this.birthday)) {
        return 'Введите дату в формате ДД.ММ.ГГГГ';
      }
      return '';
    },
    nameError() {
      if (this.name && !/[а-яА-ЯЁё]/.test(this.family)) {
        return 'Фамилия должна состоять из русских букв!';
      }
      return '';
    },
    btnActive() {
      return !this.familyError && !this.birthdayError && !this.nameError;
    },
    dialogTitle() {
      return this.editMode ? 'Редактирование пользователя' : 'Добавление пользователя';
    },
  },
  methods: {
    init() {
      if (this.user) {
        this.editMode = true;
        this.userId = this.user.id;
        this.name = this.user.name ?? '';
        this.family = this.user.family ?? '';
        this.birthday = this.user.birthday ? dayjs(this.user.birthday).format('DD.MM.YYYY') : '';
        this.setDefaultBtn();
      }
    },
    onClose() {
      this.name = '';
      this.family = '';
      this.birthday = '';
      this.$emit('clear-user');
    },
    async save() {
      this.loading = true;
      try {
        const userToSave = {
          family: this.family,
          birthday: dayjs(this.birthday, 'DD.MM.YYYY').toISOString(),
        };
        if (this.name) {
          userToSave.name = this.name;
        }

        if (this.editMode) {
          await userApi.editUser(this.userId, userToSave);
        } else {
          await userApi.createUser(userToSave);
        }

        this.$emit('user-saved');
        this.setSuccessBtn();
        setTimeout(() => {
          this.setDefaultBtn();
          setTimeout(() => {
            this.$emit('input', false);
          }, 500);
        }, 500);
      } catch (e) {
        console.log(e);
        this.setErrorBtn();
        setTimeout(this.setDefaultBtn, 1500);
      } finally {
        this.loading = false;
      }
    },
    setErrorBtn() {
      this.btnText = 'Ошибка';
      this.btnColor = 'red';
    },
    setSuccessBtn() {
      this.btnText = 'Добавлено';
      this.btnColor = 'green';
    },
    setDefaultBtn() {
      this.btnText = this.editMode ? 'Сохранить' : 'Отправить';
      this.btnColor = 'prime';
    },
  },
};
</script>

<style lang="scss" scoped>
.user-form {
  text-align: center;
  &__input-wrapper {
    margin-top: 4px;
  }
  &__button {
    margin-top: 8px;
  }
}
</style>
