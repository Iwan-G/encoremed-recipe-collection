<script setup lang="ts">
import { slugify } from '@/lib/slugify'
import type { Recipe } from '@/lib/utils/Interfaces'

import { useRouter } from 'vue-router'
import { ScrollArea } from '../ui/scroll-area'

import { BadgeHelpIcon } from 'lucide-vue-next'
import BookmarkButton from '../templates/button/BookmarkButton.vue'
import { useSavedRecipesStore } from '@/store/recipeStore'

const router = useRouter()

const store = useSavedRecipesStore()

const recipes: Recipe[] = store.getSavedRecipes
</script>

<template>
  <div
    v-if="recipes.length === 0"
    class="w-full flex flex-col gap-5 justify-center items-center"
  >
    <BadgeHelpIcon class="w-20 h-20" />
    <h1 class="text-center text-2xl font-semibold">
      Looks like you didn't save any recipes, go to the Recipes page and click save to see your recipes here.
    </h1>
    <RouterLink
      to="/recipes"
      class="text-green-500 underline underline-offset-4 text-lg font-semibold"
      >Go to Recipes page
    </RouterLink>
  </div>

  <ScrollArea
    v-else
    class="w-full h-[50em] rounded-md max-sm:ml-3 max-sm:h-[35em] shadow-lg"
  >
    <div class="w-full grid grid-cols-2 gap-5">
      <div
        v-for="recipe in recipes"
        :key="recipe.name"
        class="w-full flex flex-col items-center justify-center text-center py-5 px-2 shadow-lg rounded-md border border-foreground/10 bg-foreground/5 cursor-pointer"
      >
        <div
          class="w-[90%] h-[5em] rounded-lg overflow-hidden"
          @click="router.push(`/recipe-detail/${slugify(recipe.name)}`)"
        >
          <img
            :src="recipe.image[0]"
            :alt="recipe.name"
            class="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div class="w-full flex flex-col gap-3 justify-between items-center">
          <h1
            @click="router.push(`/recipe-detail/${slugify(recipe.name)}`)"
            class="text-lg font-semibold line-clamp-1"
          >
            {{ recipe.name }}
          </h1>

          <BookmarkButton :recipe="recipe" />
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
