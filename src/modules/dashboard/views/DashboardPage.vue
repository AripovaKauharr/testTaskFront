<template>
  <div>
    <!-- Блоки статистики -->
    <div class="box-of-blocks">
      <div v-for="(item) in blocks" :key="item.id" class="block">
        <p class="title">{{ item.title }}</p>
        <p class="value">{{ item.value }}</p>
      </div>
    </div>

    <!-- Контейнер для диаграммы -->
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <LineChart :chartData="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import LineChart from '../../../components/charts/LineChart.vue';
const chartData = ref<ChartData<'line'>>({
  labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май'],
  datasets: [
    {
      label: 'Продажи 2023',
      data: [65, 59, 80, 81, 56],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      fill: false
    },
    {
      label: 'Продажи 2024',
      data: [28, 48, 40, 19, 86],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
      fill: false
    }
  ]
});

const chartOptions = ref<ChartOptions<'line'>>({
  plugins: {
    title: {
      display: true,
      text: 'Динамика продаж'
    }
  }
});
export default defineComponent({
  name: 'DashboardPage',
  components: {LineChart},
  setup() {
    const blocks = ref([
      {id: 1, title: "Всего звонков", value: "7889"},
      {id: 2, title: "Среднее время разговора", value: "10:23"},
      {id: 3, title: "Пропущенные звонки", value: "12%"}
    ]);

    const chartCanvas = ref<HTMLCanvasElement | null>(null);
    onMounted(() => {
      if (!chartCanvas.value) return;

      Chart.register(...registerables);
      
      const ctx = chartCanvas.value.getContext('2d');
      if (!ctx) return;

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Завершенные', 'Пропущенные', 'Отклоненные'],
          datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 15,
                boxHeight: 15,
                font: {
                  size: 13,
                }
              }
            },
            title: {
              display: true,
              text: 'Распределение звонков',
              align: 'start',
              font: {
                size: 20,
              }
            }
          },
        }
      });
    });

    return {
      blocks,
      chartCanvas,
      chartData,
      chartOptions,
    };
  }
});
</script>

<style scoped>
.box-of-blocks {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.block {
  padding: 20px;
  background: white;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  color: var(--text-color);
  margin: 0;
  font-size: 14px;
}

.value {
  color: var(--accent-text-color);
  font-size: 24px;
  font-weight: 600;
  margin: 8px 0 0 0;
}

.chart-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  height: 400px;
}
</style>