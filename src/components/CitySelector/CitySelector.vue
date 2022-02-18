<template>
  <div 
    v-click-outside="closeList"
    class="city-selector"
  >
    <input
      :value="cityName"
      class="city-selector__input"
      placeholder="Start typing for search..."
      @focus="openList"
      @input="debounce"
    />
    <template v-if="isListOpened && cities.length">
      <div class="city-selector__list city-list">
        <div
          v-for="c in cities"
          class="city-list__item"
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
  import { ref } from 'vue'
  import { getCities } from '@/api'

  const emit = defineEmits(['select-city'])

  const cityName = ref('')
  const city = ref(null) 
  const cities = ref([])
  const isListOpened = ref(false)

  const debounce = function (event) {
    let cooldown
    clearTimeout(cooldown)
    cooldown = setTimeout(() => {
      cityName.value = event.target.value
      getListOfCities(event.target.value)
    }, 400)
  }

  const getListOfCities = async (val) => {
    if (!val) {
      selectCity(null)
      return
    }

    const rawCities = await getCities(val)

    cities.value = rawCities.map(c => ({
      id: c.id,
      name: c.name,
      country: c.country
    }))
  }

  const selectCity = (selected) => {
    city.value = selected || null
    cityName.value = selected?.name || ''
    cities.value = []
    closeList()

    emit('select-city', selected?.id)
  }

  const closeList = () => {
    isListOpened.value = false
  }

  const openList = () => {
    isListOpened.value = true
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

    &__input {
      width: 100%;
      padding: 10px;
      border: none;
      font-size: 3rem;
      background-color: #9934f7;
      outline: none;

      &:focus {
        background-color: #b276e9;
        cursor: text;
      }

      &::placeholder {
        color: #fff;
        font-size: 20px;
        line-height: 3rem;
      }
    }

    &__button {
      position: absolute;
      top: 0;
      left: 100%;
      margin: 10px 0 10px 10px;
      border: none;
      border-radius: 50%;
      line-height: 3rem;
      width: 3rem;
      background-color: aquamarine;
      color: blueviolet;
    }

    &__list {
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
    background-color: blueviolet;

    &__item {
      padding: 5px;
      line-height: 20px;
      
      &:hover {
        background-color: aquamarine;
        color: blueviolet;
      }
    }
  }
</style>
