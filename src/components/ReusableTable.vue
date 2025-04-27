<template>
  <table class="reusable-table">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="(column, colIndex) in columns" :key="colIndex">
          <p>
            {{ row[column.key] }}
          </p>
        </td>
      </tr>
    </tbody>
  </table>
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
      type: Array as PropType<Array<Record<string, any>>>,
      required: true
    }
  },
  setup() {},
});
</script>

<style scoped>
.reusable-table {
  border-radius: 10px;
  background-color: white;
  width: 100%;
  border-collapse: collapse;
}

.reusable-table th,
.reusable-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}

.reusable-table th {
  border-top: none;
}
</style>
