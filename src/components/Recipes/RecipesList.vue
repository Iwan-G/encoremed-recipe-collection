<script setup lang="ts">
import type { Recipe } from '@/lib/utils/Interfaces'
import { ref, onMounted } from 'vue'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import Skeleton from '../ui/skeleton/Skeleton.vue'
import { slugify } from '@/lib/slugify'

import { Button } from '../ui/button'

import { toast } from 'vue-sonner'
import Badge from '../ui/badge/Badge.vue'
import FilterButton from '../templates/button/FilterButton.vue'
import SearchBarTemplate from '../templates/SearchBarTemplate.vue'
import BookmarkButton from '../templates/button/BookmarkButton.vue'

const recipes = ref<Recipe[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const search = ref<string | null>(null)
const filterValue = ref<string | ''>('')
const anotherFilterValue = ref<string | ''>('')

const fetchRecipes = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/micahcochran/json-cookbook/refs/heads/main/cookbook-100.json`,
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const allRecipes: Recipe[] = await response.json()
    recipes.value = allRecipes.filter(recipe => {
      const matchesSearch =
        !search.value ||
        recipe.name?.toLowerCase().includes(search.value!.toLowerCase()) ||
        recipe.name
          ?.toLowerCase()
          .replace(/\s/g, '')
          .includes(search.value!.toLowerCase().replace(/\s/g, ''))

      const matchesCategory =
        !filterValue.value ||
        (typeof recipe.recipeCategory === 'string' &&
          (recipe.recipeCategory
            .toLowerCase()
            .includes(filterValue.value.toLowerCase()) ||
            recipe.recipeCategory
              .toLowerCase()
              .replace(/\s/g, '')
              .includes(filterValue.value.toLowerCase().replace(/\s/g, '')))) ||
        (Array.isArray(recipe.recipeCategory) &&
          recipe.recipeCategory.some(
            category =>
              category
                .toLowerCase()
                .includes(filterValue.value.toLowerCase()) ||
              category
                .toLowerCase()
                .replace(/\s/g, '')
                .includes(filterValue.value.toLowerCase().replace(/\s/g, '')),
          ))

      const matchesIngredient =
        !anotherFilterValue.value ||
        recipe.recipeIngredient
          .join(', ')
          .toLowerCase()
          .includes(anotherFilterValue.value.toLowerCase())

      return matchesSearch && matchesCategory && matchesIngredient
    })
  } catch (err) {
    console.error('Error fetching recipes:', err)
    toast.error(`Failed to fetch recipes. Please try again later.`)
  } finally {
    isLoading.value = false
  }
}

const handleSearch = (newSearch: string) => {
  search.value = newSearch
  fetchRecipes()
}

const handleFilterChange = (newFilter: string) => {
  filterValue.value = newFilter
  fetchRecipes()
}

const handleAnotherFilterChange = (newFilter: string) => {
  anotherFilterValue.value = newFilter
  fetchRecipes()
}

const clearSearch = () => {
  search.value = null
  filterValue.value = ''
  anotherFilterValue.value = ''
  fetchRecipes()
}

onMounted(fetchRecipes)
</script>

<template>
  <div
    v-if="isLoading"
    class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <div
      v-for="i in 20"
      :key="i"
      class="flex justify-center items-center gap-16"
    >
      <Skeleton class="w-[100%] h-[29em] bg-foreground/40" />
    </div>
  </div>

  <div
    v-else-if="recipes.length === 0"
    class="w-full flex flex-col items-center justify-center gap-4"
  >
    <p class="text-center text-2xl font-medium">
      No recipes found matching the searched keyword.
    </p>
    <Button variant="default" class="text-md" @click="clearSearch"
      >Go Back</Button
    >
  </div>

  <section v-else>
    <div
      class="w-full flex max-xl:flex-col justify-center items-start gap-5 relative"
    >
      <div
        class="w-full flex flex-col flex-[0.7] max-xl:flex-row sticky top-20 justify-end items-start py-5 gap-2 bg-foreground/10 backdrop-blur-md shadow-lg px-4 rounded-lg z-20"
      >
        <div
          class="max-sm:hidden flex flex-wrap justify-center items-center gap-2"
        >
          <Badge
            v-if="filterValue"
            variant="default"
            class="text-[12px] font-medium"
          >
            {{ filterValue }}
          </Badge>

          <Badge
            v-if="anotherFilterValue"
            variant="default"
            class="text-[12px] font-medium"
          >
            {{ anotherFilterValue }}
          </Badge>

          <Badge
            v-if="anotherFilterValue || filterValue"
            @click="clearSearch"
            variant="destructive"
            class="text-[12px] font-medium cursor-pointer"
          >
            Clear Filters
          </Badge>
        </div>
        <FilterButton
          :filterValue="filterValue"
          :anotherFilterValue="anotherFilterValue"
          @update:filterValue="handleFilterChange"
          @update:anotherFilterValue="handleAnotherFilterChange"
          @clearSearch="clearSearch"
        />

        <SearchBarTemplate
          :search="search || ''"
          @search="handleSearch"
          @clearSearch="clearSearch"
        />
      </div>
      <div
        class="w-full flex-[4] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <div v-for="recipe in recipes" :key="recipe.name" class="w-full h-full">
          <div
            class="w-full flex flex-col items-center justify-center py-7 px-5 shadow-lg rounded-md border border-foreground/10 gap-4 bg-foreground/5 overflow-hidden"
          >
            <div
              class="w-[99%] h-[14em] rounded-lg overflow-hidden cursor-pointer"
            >
              <RouterLink :to="`/recipe-detail/${slugify(recipe.name)}`">
                <img
                  :src="
                    recipe.image && recipe.image.length > 0
                      ? recipe.image[0]
                      : ''
                  "
                  :alt="recipe.name"
                  class="w-full h-full object-cover rounded-lg transition-all duration-300 hover:scale-110"
                />
              </RouterLink>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger class="cursor-pointer">
                  <h2 class="text-2xl font-medium text-center line-clamp-1">
                    {{ recipe.name }}
                  </h2>
                </TooltipTrigger>
                <TooltipContent class="bg-foreground text-background">
                  <p>{{ recipe.name }}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <p class="text-sm text-center line-clamp-3 cursor-default">
              {{ recipe.description }}
            </p>

            <BookmarkButton :recipe="recipe" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
