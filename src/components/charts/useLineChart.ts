import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { LineChartProps } from './types';

export function useLineChart(canvas: HTMLCanvasElement | null, props: LineChartProps) {
  const chartInstance = ref<Chart<'line'> | null>(null);

  const initChart = () => {
    if (!canvas) return;

    Chart.register(...registerables);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    chartInstance.value = new Chart(ctx, {
      type: 'line',
      data: props.chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.dataset.label}: ${context.parsed.y}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false
          }
        },
        ...props.options
      }
    });
  };

  const updateChart = () => {
    chartInstance.value?.update();
  };

  const destroyChart = () => {
    chartInstance.value?.destroy();
  };

  onMounted(initChart);
  onBeforeUnmount(destroyChart);
  watch(() => props.chartData, updateChart, { deep: true });

  return { chartInstance };
}