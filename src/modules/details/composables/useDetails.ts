import { onMounted, ref } from "vue";
import { fetchCalls } from "../service";
import { GetCalls } from "../types/details.types";

export function useDetails () {
   const calls = ref<GetCalls>();
   const isLoading = ref(false);
   const error = ref<string | null>(null);
   
   const columns = [
     { key: 'id', label: 'ID' },
     { key: 'caller_number', label: 'Номер звонящего' },
     { key: 'start_time', label: 'Время начала' },
     { key: 'duration', label: 'Длительность' },
     { key: 'status', label: 'Статус' },
     { key: 'agent_id', label: 'Категория' }
   ]

   const loadCalls = async () => {
     try {
       isLoading.value = true;
       calls.value = await fetchCalls();
     } catch (err) {
       error.value = 'Ошибка при загрузке пользователей';
       console.error(err);
     } finally {
       isLoading.value = false;
     }
   };

   onMounted(() => {
     loadCalls();
   });
   return {
    columns,
    calls,
    isLoading,
    error,
   }
};