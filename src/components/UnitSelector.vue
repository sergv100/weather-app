<template>
  <div class="unit-selector">
    <button
      :value="WeatherUnits.METRIC"
      :class="{ 'unit_selected' : isMetric }"
      class="unit-selector--item unit unit--metric" 
      @click="select"
    >
      metric
    </button>
    <button
      :value="WeatherUnits.IMPERIAL"
      :class="{ 'unit_selected' : !isMetric }"
      class="unit-selector--item unit unit--imperial"
      @click="select"
    >
      imperial
    </button>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { WeatherUnits } from '@/utils/constants'

  const emit = defineEmits(['select-unit'])
  
  const props = defineProps({
    selectedUnit: {
      type: String,
      required: true,
      validator(val) {
        return [
          WeatherUnits.METRIC,
          WeatherUnits.IMPERIAL
        ].includes(val)
      }
    }
  })

  const isMetric = computed(() => props.selectedUnit === WeatherUnits.METRIC)

  const select = (e) => emit('select-unit', e.target.value)
</script>

<style lang="scss" scoped>
  .unit-selector {
    padding-top: 20px;
  }
  .unit {
    border: none;
    cursor: pointer;
    color: #fff;
    background-color: #5d10a5;
    padding: 5px 10px;
    min-width: 100px;

    &_selected {
      background-color: aquamarine;
      color: blueviolet;
    }

    &--metric {
      border-radius: 5px 0 0 5px;
    }

    &--imperial {
      border-radius: 0 5px 5px 0;
    }
  }
</style>
