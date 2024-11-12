<script setup lang="ts">
import { Skeleton } from '../ui/skeleton'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
</script>

<template>
  <Carousel class="w-full flex justify-center items-center py-5">
    <CarouselContent>
      <CarouselItem
        v-for="i in 20"
        :key="i"
        class="flex justify-center items-center md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
      >
        <Skeleton class="w-[20em] h-[25em] bg-foreground/40" />
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
