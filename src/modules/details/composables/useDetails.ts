import { onMounted, ref, watch } from "vue";
import { fetchCalls } from "../service";
import { GetCalls, CallFilterParams } from "../types/details.types";

export function useDetails() {
  const calls = ref<GetCalls>();
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  // Состояния фильтров
  const filters = ref<CallFilterParams>({
    from: undefined,
    to: undefined,
    category: undefined,
    status: undefined,
    agentId: undefined
  });

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'caller_number', label: 'Номер звонящего' },
    { key: 'start_time', label: 'Время начала' },
    { key: 'duration', label: 'Длительность' },
    { key: 'status', label: 'Статус' },
    { key: 'agent_id', label: 'Категория' }
  ];

  const loadCalls = async (params: CallFilterParams = {}) => {
    try {
      isLoading.value = true;
      const queryParams = { ...filters.value, ...params };
      console.log(filters.value);
      
      calls.value = await fetchCalls(queryParams);
    } catch (err) {
      error.value = 'Ошибка при загрузке звонков';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };
  watch(filters, (newVal) => {
    loadCalls(newVal);
  }, { deep: true });

  const updateFilter = <K extends keyof CallFilterParams>(key: K, value: CallFilterParams[K]) => {
    filters.value[key] = value;
    loadCalls();
  };

  onMounted(() => {
    loadCalls();
  });

  return {
    columns,
    calls,
    isLoading,
    error,
    filters,
    updateFilter,
    loadCalls
  };
}