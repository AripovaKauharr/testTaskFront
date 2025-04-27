<template>
  <button
    :class="['btn', buttonType, { 'btn-loading': isLoading }]"
    :disabled="isLoading"
    @click="handleClick"
  >
    <span v-if="isLoading">Загрузка...</span>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    buttonType: {
      type: String,
      default: 'primary',
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.onClick();
    },
  },
});
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary {
  background-color: var(--main-color);
  color: white;
}

.primary:hover {
  background-color: var(--main-color-700);
}

.secondary {
  background-color: #6c757d;
  color: white;
}

.secondary:hover {
  background-color: #5a6268;
}

.loading {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
