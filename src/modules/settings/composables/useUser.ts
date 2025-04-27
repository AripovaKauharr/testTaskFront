import { onMounted, ref } from "vue";
import { createUser, fetchUsers } from "../service";
import { CreateUser } from "../types/user.types";

export function useUser () {
   const users = ref<any[]>([]);
   const isLoading = ref(false);
   const error = ref<string | null>(null);
   
   const columns = [
     { key: 'name', label: 'Имя' },
     { key: 'age', label: 'Возраст' },
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
     const newUser: CreateUser = {
       userName: 'Новый пользователь',
       roleId: 30,
       email: 'active'
     };

     try {
       await createUser(newUser);
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
    handleCreateUser
   }
};