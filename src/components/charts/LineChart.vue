<template>
  <div class="line-chart-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LineChartProps } from './types';
import { useLineChart } from './useLineChart';

const props = defineProps<LineChartProps>();
const canvasRef = ref<HTMLCanvasElement | null>(null);

useLineChart(canvasRef.value, props);
</script>

<style scoped>
.line-chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>