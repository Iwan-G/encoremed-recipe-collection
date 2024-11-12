<template>
    <div v-if="ingredients && ingredients.length" class="w-full flex flex-col gap-5">
      <h2 class="text-2xl font-bold">Ingredients</h2>
      <ul class="list-disc list-inside">
        <li v-for="(ingredient, index) in ingredients" :key="index">
          {{ ingredient }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  const props = defineProps<{
    ingredients: string[]
  }>()
  </script>
  