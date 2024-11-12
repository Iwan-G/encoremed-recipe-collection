<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '../ui/button/Button.vue'
import RecipesCuisine from './RecipesCuisine.vue'
import RecipesDrinks from './RecipesDrinks.vue'
import SaveRecipes from './SaveRecipes.vue'

const router = useRouter()
</script>

<template>
  <section class="w-full flex flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center text-center gap-4">
      <h1 class="text-7xl font-semibold">Welcome to the Recipe Hub</h1>
      <p class="text-base font-medium text-foreground/50">
        A recipe app built with Vue + Vite, Typescript, TailwindCSS and Shadcn/UI
      </p>
      <Button
        @click="router.push('/recipes')"
        variant="default"
        class="font-semibold text-lg"
        >Explore More Recipes</Button
      >
    </div>

    <SaveRecipes />
    <RecipesCuisine />
    <RecipesDrinks />
  </section>
</template>
