<script setup lang="ts">
import { unslugify, normalizeText } from '@/lib/slugify'
import type { Recipe } from '@/lib/utils/Interfaces'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { Loader2Icon, Clock } from 'lucide-vue-next'
import BookmarkButton from '../templates/button/BookmarkButton.vue'
import { formatISO8601Duration } from '@/lib/utils'
import IngredientList from './IngredientList.vue'
import InstructionList from './InstructionList.vue'

const route = useRoute()

const unslug = ref(route.params.slug as string)
const slug = ref(unslugify(unslug.value))

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
    recipes.value = allRecipes.filter(recipe => {
      const normalizedRecipeName = normalizeText(recipe.name)
      const normalizedSlug = normalizeText(slug.value)

      const slugWords = normalizedSlug.split(/\s+/)

      return slugWords.every(word => normalizedRecipeName.includes(word))
    })
  } catch (err) {
    console.error('Error fetching recipes:', err)
    error.value = 'Failed to fetch recipes. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchRecipes)
watch(() => route.params.slug, fetchRecipes)
</script>

<template>
  <div v-if="isLoading" class="w-full flex flex-col gap-2 justify-center items-center">
    <Loader2Icon class="w-10 h-10 animate-spin" />
    <p class="text-xl font-medium">Loading...</p>
  </div>
  <div v-else-if="error" class="w-full flex justify-center items-center">
    {{ error }}
  </div>

  <div v-else class="w-full flex flex-col gap-5">
    <div v-for="recipe in recipes" :key="recipe.name"
      class="w-full flex md:flex-row flex-col justify-center items-start gap-5">
      <div class="w-full flex flex-1 justify-center items-center">
        <div class="w-[90%] h-[100%] rounded-lg overflow-hidden cursor-pointer">
          <img :src="recipe.image?.[0]" :alt="recipe.name"
            class="w-full h-full object-cover transition-all duration-300 hover:scale-110" />
        </div>
      </div>

      <div class="w-full flex flex-col flex-1 justify-center items-start gap-5">
        <div class="w-full flex flex-col gap-2">
          <h1 class="text-5xl font-bold">{{ recipe.name }}</h1>
          <div class="text-sm font-medium flex items-center gap-4">
            <div class="flex items-center gap-1">
              <span>Author: {{ recipe.author?.name || "Unknown" }}</span>
            </div>
            <div v-if="recipe.recipeYield" class="flex items-center gap-1">
              <span>Yield: {{ recipe.recipeYield }}</span>
            </div>
            <div v-if="recipe.totalTime" class="flex items-center gap-1">
              <Clock class="w-4 h-4" />
              <span> {{ formatISO8601Duration(recipe.totalTime) }}</span>
            </div>
          </div>
        </div>

        <BookmarkButton :recipe="recipe" />
        <p class="text-lg">{{ recipe.description }}</p>

        <IngredientList :ingredients="recipe.recipeIngredient" />

        <InstructionList :instructions="recipe.recipeInstructions" />
      </div>
    </div>
  </div>
</template>
