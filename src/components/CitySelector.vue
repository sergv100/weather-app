<template>
<!-- TODO: hide city list after click outside -->
  <div class="city-selector">
    <input 
      v-model="city"
      class="city-selector--input"
      @focus="getListOfCities"
      @change="getListOfCities"
    />
    <template v-if="isListOpened">
      <div class="city-selector--list city-list">
        <div
          v-for="c in cities"
          class="city-list--item"
          :key="c.id"
          @click="selectCity(c)"
        >
          {{ c.name }}, {{ c.country }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { getCities } from '@/api'

  const emit = defineEmits(['select-city'])

  const initialCity = ref({
    id: 498817,
    name: 'Saint Petersburg',
    country: 'RU'
  })
  const city = ref('Saint Petersburg') 
  const cities = ref([])
  const isFocused = ref(false)
  const isListOpened = computed(() => Boolean(cities.value.length)) 

  const getListOfCities = async () => {
    if (!city.value) {
      cities.value = [];
    }

    const rawCities = await getCities(city.value)

    cities.value = rawCities.map(c => ({
      id: c.id,
      name: c.name,
      country: c.country
    }))
  }

  const selectCity = (selected) => {
    city.value = selected.name
    cities.value = []

    emit('select-city', selected.id)
  }
  
</script>

<style lang="scss" scoped>
  .city-selector {
    width: 100%;
    max-width: 360px;
    position: relative;
    & > * {
      cursor: pointer;
      box-sizing: border-box;
      border-radius: 4px;
      color: #fff;
      text-align: center;
    }
    &--input {
      width: 100%;
      padding: 10px;
      border: none;
      background-color: transparent;
      outline: none;
      &:focus {
        background-color: #b276e9;
        cursor: text;
      }
    }
    &--list {
      width: 100%;
      position: absolute;
      left: 0;
      top: 100%;
      border: 2px solid #b276e9;
    }
  }
  .city-list {
    padding: 0px;
    max-height: 300px;
    overflow: scroll;
    &--item {
      padding: 5px;
      line-height: 20px;
      &:hover {
        background-color: aquamarine;
        color: blueviolet;
      }
    }
  }
</style>
