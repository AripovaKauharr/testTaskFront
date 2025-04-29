<template>
  <div>
    <ReusableTable 
      :columns="columns" 
      :rows="calls?.data || []" 
      :loading="isLoading"
      :error="error"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ReusableTable from '../../../components/ReusableTable.vue';
import { useDetails } from '../composables/useDetails';

export default defineComponent({
  name: 'DetailsPage',
  components: {
    ReusableTable
  },
  setup() {
    const {
      columns,
      calls,
      isLoading,
      error,
    } = useDetails()
    return {
      columns,
      calls,
      isLoading,
      error,
    };
  }
});
</script>

<style scoped>
</style>