<template>
  <div>
    <div class="box-of-blocks">
      <div v-for="(item) in statsBlocks" :key="item.id" class="block">
        <p class="title">{{ item.title }}</p>
        <p class="value">{{ item.value }}</p>
      </div>
    </div>
    <div class="line-and-pie-box">
      <div class="chart-container">
        <p>Расспределение звонков по часам</p>
        <LineChart :chartData="chartData" :options="chartOptions" />
      </div>
      <div class="chart-container">
        <p>Статусы звонков</p>
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
    <div class="chart-container">

      <BarChart 
       :data="categoryAnalytics" 
       color="#ff2d88" 
       :showLegend="false"
     />
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import LineChart from '../../../components/charts/LineChart.vue';
import { useAnalytics } from '../composables/useAnalytics';
import { watchEffect } from 'vue';
import BarChart from '../../../components/charts/BarChart.vue';
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
  responsive: true,
  scales: {
    x: {
      ticks: {
        callback: function(value, index) {
          return index % 4 === 0 ? this.getLabelForValue(+value) : '';
        },
        autoSkip: true,
        maxTicksLimit: 6
      }
    },
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true
    }
  }
});
export default defineComponent({
  name: 'DashboardPage',
  components: {LineChart, BarChart},
  setup() {
    const barChartCanvas = ref<HTMLCanvasElement | null>(null);

    const chartCanvas = ref<HTMLCanvasElement | null>(null);

    const {getAnalyticStats, statsBlocks, analyticsData, categoryAnalytics } = useAnalytics()
    watchEffect(() => {
      if (!analyticsData.value) return;
    
      chartData.value = {
        labels: analyticsData.value.hourlyDistribution.map(h => `${h.hour}:00`),
        datasets: [{
          label: 'Активность по часам',
          data: analyticsData.value.hourlyDistribution.map(h => h.count),
          borderColor: '#ff2d88',
          tension: 0.2,
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 0,
        }],
      };
    });
    
    
    watchEffect(() => {
      if (!chartCanvas.value || !analyticsData.value) return;
    
      const ctx = chartCanvas.value.getContext('2d');
      if (!ctx) return;
    
      const existingCharts = Chart.getChart(ctx);
      if (existingCharts) existingCharts.destroy();
    
      const labels = analyticsData.value.statusDistribution.map(s => {
        if (s.status === 'completed') return 'Завершенные';
        if (s.status === 'missed') return 'Пропущенные';
        if (s.status === 'rejected') return 'Отклоненные';
        return s.status;
      });
      const data = analyticsData.value.statusDistribution.map(s => s.percentage);
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: ['#ff2d88', '#fb7db3', '#e0e0e0'],
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
                font: { size: 13 }
              }
            },
            title: {
              display: false,
              text: 'Распределение звонков',
              font: { size: 20 }
            }
          }
        }
      });
    });
    
watchEffect(() => {
  if (!barChartCanvas.value || !analyticsData.value) return;

  const ctx = barChartCanvas.value.getContext('2d');
  if (!ctx) return;

  const existingChart = Chart.getChart(ctx);
  if (existingChart) existingChart.destroy();

  const labels = analyticsData.value.avgDurationByCategory.map(c => 
    c.category.charAt(0).toUpperCase() + c.category.slice(1)
  );
  const data = analyticsData.value.avgDurationByCategory.map(c => 
    (c.averageDuration / 60).toFixed(2) // минуты
  );

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Средняя длительность (мин)',
        data,
        backgroundColor: '#e6007a'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Средняя длительность разговора по категориям',
          font: {
            size: 18
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});


    return {
      statsBlocks,
      chartCanvas,
      chartData,
      chartOptions,
      getAnalyticStats,
      analyticsData,
      barChartCanvas,
      categoryAnalytics
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    width: 100%;
    height: 80%;
  }
}
.line-and-pie-box{
  display: flex;
  gap: 20px;
  height: 300px;
  margin-bottom: 20px;
  > div{ 
    width: 50%;
  }
}
</style>