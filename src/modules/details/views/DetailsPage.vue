<template>
  <div>
    <ReusableTable :columns="columns" :rows="rows" />
  </div>
</template>

<script lang="ts">
import ReusableTable from '@/components/ReusableTable.vue'

export default {
  name: 'Details page',
  components: {
    ReusableTable
  },
  data(){
    return{
      columns: [
        { key: 'name', label: 'Имя' },
        { key: 'age', label: 'Возраст' },
        { key: 'status', label: 'Статус' }
      ],
      rows: [
        { name: 'Иван', age: 25, status: 'Активен' },
        { name: 'Мария', age: 30, status: 'Неактивен' },
        { name: 'Алексей', age: 28, status: 'Активен' }
      ]
    }
  }
};
</script>

<style scoped>

</style>
