import { onMounted, ref } from "vue";
import { createUser, fetchUsers } from "../service";
import { CreateUser } from "../types/user.types";

export function useUser () {
  const isModalOpen = ref(false);
   const users = ref<any[]>([]);
   const isLoading = ref(false);
   const error = ref<string | null>(null);
   const newUser = ref<CreateUser>({
    userName: '',
    role: '',
    email: '',
    password: ''
  });
  const openModal = () => {
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    newUser.value = {
      userName: '',
      role: '',
      password: '',
      email: '',
    };
  };
   const columns = [
     { key: 'userName', label: 'Имя' },
     { key: 'email', label: 'email' },
     { key: 'status', label: 'Статус' }
   ];

   const loadUsers = async () => {
     try {
       isLoading.value = true;
       users.value = await fetchUsers();
     } catch (err) {
       error.value = 'Ошибка при загрузке пользователей';
       console.error(err);
     } finally {
       isLoading.value = false;
     }
   };

   const handleCreateUser = async () => {
     try {
       await createUser(newUser.value);
       closeModal()
       await loadUsers();
     } catch (err) {
       error.value = 'Ошибка при создании пользователя';
       console.error(err);
     }
   };

   onMounted(() => {
     loadUsers();
   });
   return {
    columns,
    users,
    isLoading,
    error,
    handleCreateUser,
    isModalOpen,
    openModal,
    closeModal
   }
};