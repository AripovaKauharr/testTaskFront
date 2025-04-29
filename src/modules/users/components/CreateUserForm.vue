<template>
  <form @submit.prevent="submit">
      <Input
        v-model="form.userName"
        label="Имя пользователя"
        placeholder="Введите имя пользователя"
      />
      <Input
        v-model="form.email"
        label="Email"
        placeholder="Введите email"
        type="email"
      />
      <Input
        v-model="form.password"
        label="Пароль"
        placeholder="Введите пароль"
      />
      <Input
        v-model="form.role"
        label="Роль"
        placeholder="Введите роль"
      />
    <slot name="footer"></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { User } from "../types/user.types";
import Input from '../../../components/Input.vue';
import { watch } from 'vue';

export default defineComponent({
  name: 'CreateUserForm',
  components: {
    Input,
  },
  props: {
    initialData: {
      type: Object as () => User,
      default: () => ({
        userName: '',
        role: 'USER',
        email: '',
        password: '',
      })
    }
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const form = reactive({ ...props.initialData });

    watch(
      () => props.initialData,
      (newData) => {
        Object.assign(form, newData);
      },
      { deep: true }
    );

    const submit = () => {
      emit('submit', { ...form });
    };

    return {
      form,
      submit,
    };
  },
});
</script>

<style scoped>
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>