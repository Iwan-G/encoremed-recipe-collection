<script setup lang="ts">
import type { Recipe } from '@/lib/utils/Interfaces'
import { ref, onMounted } from 'vue'
import CarouselTemplate from '../templates/CarouselTemplate.vue';


const recipes = ref<Recipe[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const fetchRecipes = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/micahcochran/json-cookbook/refs/heads/main/cookbook-100.json',
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const allRecipes: Recipe[] = await response.json()
    recipes.value = allRecipes.filter(
      recipe => recipe.recipeCuisine === 'American',
    )
  } catch (err) {
    console.error('Error fetching recipes:', err)
    error.value = 'Failed to fetch recipes. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchRecipes)
</script>

<template>
  <div class="w-full flex flex-col items-start justify-center py-[5rem] gap-5">
    <h2 class="text-4xl font-medium text-start">American Cuisine</h2>
    <CarouselTemplate
      :recipes="recipes"
      :is-loading="isLoading"
      :error="error"
      :delay-seconds="5000"
    />
  </div>
</template>
