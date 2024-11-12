<script setup lang="ts">
import { X, Heart } from 'lucide-vue-next'

import type { Recipe } from '@/lib/utils/Interfaces'
import { Button } from '@/components/ui/button'
import { computed } from 'vue'
import { useSavedRecipesStore } from '@/store/recipeStore';

const props = defineProps<{
  recipe: Recipe | null
}>()

const recipesStore = useSavedRecipesStore()

const isBookmarked = computed(() => {
  return props.recipe ? recipesStore.isRecipeSaved(props.recipe) : false
})

const addRecipe = () => {
  if (props.recipe) {
    recipesStore.setSavedRecipes(props.recipe)
  }
}

const removeRecipe = () => {
  if (props.recipe) {
    recipesStore.removeSavedRecipe(props.recipe)
  }
}
</script>

<template>
  <div class="flex gap-2">
    <Button
      variant="default"
      @click="addRecipe"
      v-if="!isBookmarked"
    >
      <Heart class="w-5 h-5" /> Save Recipe
    </Button>

    <Button
      variant="default"
      @click="removeRecipe"
      v-if="isBookmarked"
    >
      <X class="w-5 h-5" /> Remove Recipe
    </Button>
  </div>
</template>
