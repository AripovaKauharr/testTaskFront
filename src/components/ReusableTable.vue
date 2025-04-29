<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="column in columns" :key="column.key">
            <slot 
              :name="`cell-${column.key}`" 
              :value="row[column.key]" 
              :row="row"
              :column="column"
            >
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Column {
  key: string;
  label: string;
}

export default defineComponent({
  name: 'ReusableTable',
  props: {
    columns: {
      type: Array as PropType<Column[]>,
      required: true
    },
    rows: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    loading: Boolean,
    error: String
  }
});
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
th {
  background-color: #f5f5f5;
  font-weight: 500;
}
.loading, .error {
  padding: 16px;
  text-align: center;
}
</style>