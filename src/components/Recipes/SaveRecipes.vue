<script setup lang="ts">
import type { Recipe } from '@/lib/utils/Interfaces'
import { ref, onMounted, watch } from 'vue'


import CarouselTemplate from '../templates/CarouselTemplate.vue';
import { useSavedRecipesStore } from '@/store/recipeStore';

const recipes = ref<Recipe[]>([])
const savedRecipes = useSavedRecipesStore()

onMounted(() => {
  recipes.value = savedRecipes.getSavedRecipes
})

watch(
  () => savedRecipes.savedRecipes,
  newRecipes => {
    recipes.value = newRecipes
  },
  { immediate: true },
)
</script>

<template>
  <div
    v-if="savedRecipes.savedRecipes.length > 2"
    class="w-full flex flex-col items-start justify-center py-[5rem] px-2 gap-5"
  >
    <h2 class="text-4xl font-medium text-start">
      Saved ({{ recipes.length }})
    </h2>
    <CarouselTemplate
      :recipes="recipes"
      :is-loading="false"
      :error="null"
      :delay-seconds="6000"
    />
  </div>

  <div v-else class="hidden"></div>
</template>
