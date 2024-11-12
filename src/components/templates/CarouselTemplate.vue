<script setup lang="ts">
import type { Recipe } from '@/lib/utils/Interfaces'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Autoplay from 'embla-carousel-autoplay'
import BookmarkButton from './button/BookmarkButton.vue'
import CarouselSkeleton from '../Loaders/CarouselSkeleton.vue'
import { slugify } from '@/lib/slugify'
import MoreRecipesButton from './button/MoreRecipesButton.vue'

defineProps<{
  recipes: Recipe[]
  isLoading: boolean
  error: string | null
  delaySeconds?: number | 2000
}>()
</script>

<template>
  <div v-if="isLoading" class="w-full flex justify-center items-center">
    <CarouselSkeleton />
  </div>
  <div v-else-if="error">{{ error }}</div>

  <div class="w-full flex justify-center items-center cursor-pointer">
    <Carousel
      :plugins="[
        Autoplay({
          delay: delaySeconds,
          stopOnFocusIn: true,
        }),
      ]"
      class="relative w-full flex justify-center items-center"
    >
      <CarouselContent class="gap-5">
        <CarouselItem
          v-for="recipe in recipes"
          :key="recipe.name"
          class="w-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
        >
          <div
            class="w-full flex flex-col items-center justify-center py-7 px-5 shadow-lg rounded-md border border-foreground/10 gap-4 bg-foreground/5 overflow-hidden"
          >
            <div
              class="w-[99%] h-[14em] rounded-lg overflow-hidden cursor-pointer"
            >
              <RouterLink :to="`/recipe-detail/${slugify(recipe.name)}`">
                <img
                  :src="recipe.image[0]"
                  :alt="recipe.name"
                  class="w-full h-full object-cover rounded-lg transition-all duration-300 hover:scale-110"
                />
              </RouterLink>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger class="cursor-pointer">
                  <RouterLink :to="`/recipe-detail/${slugify(recipe.name)}`">
                    <h2 class="text-2xl font-medium text-center line-clamp-1">
                      {{ recipe.name }}
                    </h2>
                  </RouterLink>
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
        </CarouselItem>
      </CarouselContent>
      <div
        class="absolute -top-14 right-7 flex gap-5 max-sm:absolute max-sm:top-[30rem] max-sm:right-10 max-sm:left-10 max-sm:justify-center"
      >
        <CarouselPrevious />
        <CarouselNext />
        <MoreRecipesButton />
      </div>
    </Carousel>
  </div>
</template>
