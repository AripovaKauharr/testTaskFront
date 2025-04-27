<template>
  <div class="box-of-blocks">
    <div v-for="(item) in blocks" :key="item.id" class="block">
      <p class="title">{{ item.title }}</p>
      <p class="value">{{ item.value }}</p>
    </div>
  </div>

</template>

<script lang="ts">
export default {
  name: 'Dashboard page',
  data(){
    return{
      blocks: [
        {id: 1, title: "Всего звонков", value: "7889"},
        {id: 2, title: "Среднее время разговора", value: "10:23"},
        {id: 3, title: "Пропущенные звонки", value: "12%"}
      ]
    }
  }
};
</script>

<style scoped>
.box-of-blocks{
  display: flex;
  gap: 20px
}
.block{
  padding: 20px;
  background: white;
  border-radius: 10px;
  width: 100%;
}
.title{
  color: var(--text-color)

}
.value{
  color: var(--accent-text-color);
  font-size: 40px;
  font-weight: 600;
  margin-top: 4px;
}
</style>
