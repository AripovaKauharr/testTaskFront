<template>
  <div>
    <ReusableTable 
      :columns="columns" 
      :rows="users" 
      :loading="isLoading"
      :error="error"
    />
    <Button
        type="submit"
        text="Добавить пользователя"
        :onClick="openModal"
        buttonType="primary"
      />
  </div>
  <Modal :isOpen="isModalOpen" title="Добавить нового пользователя" @close="closeModal">
      <CreateUserForm @submit="handleCreateUser">
        <template #footer>
          <div class="form-actions">
            <Button
              type="button"
              text="Отмена"
              :onClick="closeModal"
              buttonType="secondary"
            />
            <Button
              type="submit"
              text="Создать"
              :isLoading="isLoading"
              :onClick="handleCreateUser"
              buttonType="primary"
            />
          </div>
        </template>
      </CreateUserForm>
    </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ReusableTable from '../../../components/ReusableTable.vue';
import { useUser } from '../composables/useUser';
import Button from '../../../components/Button.vue';
import Modal from '../../../components/Modal.vue';
import CreateUserForm from '../components/CreateUserForm.vue'

export default defineComponent({
  name: 'SettingsPage',
  components: {
    ReusableTable,
    Button,
    Modal, 
    CreateUserForm, 
  },
  setup() {
    const {
      columns,
      users,
      isLoading,
      error,
      handleCreateUser,
      isModalOpen,
      openModal,
      closeModal
    } =useUser()
    return {
      columns,
      users,
      isLoading,
      error,
      handleCreateUser,
      isModalOpen,
      openModal,
      closeModal
    };
  }
});
</script>

<style scoped>
.form-actions{
  display: flex;
  justify-content: space-between;
  gap: 10px;
  > button {
    width: 100%;
  }
}
</style>