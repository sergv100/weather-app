<template>
  <div class="unit-selector">
    <template 
      v-for="(btn, i) in buttons"
      :key="`${btn.value}-${i}`"
    >
      <button
        :value="btn.value"
        :class="{ 'unit-selector__item_selected' : isSelectedUnit(btn.value) }"
        class="unit-selector__item"
        @click="select"
      >
        {{ btn.title }}
      </button>
    </template>
  </div>
</template>

<script setup>
  import { WeatherUnits } from '@/utils/constants'
  import { isPossibleUnit } from '@/helpers'
  import { reactive } from 'vue'

  const emit = defineEmits(['select-unit'])
  
  const props = defineProps({
    selectedUnit: {
      type: String,
      required: true,
      validator: (val) => isPossibleUnit(val)
    }
  })

  const buttons = reactive([
    { value: WeatherUnits.METRIC, title: 'metric' },
    { value: WeatherUnits.IMPERIAL, title: 'imperial' },
  ])

  const isSelectedUnit = (cur) => cur === props.selectedUnit

  const select = (e) => emit('select-unit', e.target.value)
</script>

<style lang="scss" scoped>
  .unit-selector {
    margin-top: 20px;
    overflow: hidden;
    border-radius: 5px;

    &__item {
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
    }
  }
</style>
