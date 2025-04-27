<template>
  <div>
    <ReusableTable 
      :columns="columns" 
      :rows="users" 
      :loading="isLoading"
      :error="error"
    />
    <button @click="handleCreateUser">Добавить пользователя</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ReusableTable from '../../../components/ReusableTable.vue';
import { useUser } from '../composables/useUser';

export default defineComponent({
  name: 'SettingsPage',
  components: {
    ReusableTable
  },
  setup() {
    const {
      columns,
      users,
      isLoading,
      error,
      handleCreateUser
    } =useUser()
    return {
      columns,
      users,
      isLoading,
      error,
      handleCreateUser
    };
  }
});
</script>

<style scoped>
</style>