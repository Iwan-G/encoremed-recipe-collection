<template>
    <div v-if="instructions" class="w-full flex flex-col gap-5">
      <h2 class="text-2xl font-bold">Instructions</h2>
      <ul class="list-inside list-decimal text-justify space-y-2">
        <template v-if="Array.isArray(instructions) && instructions.length > 0">
          <li v-for="(instruction, index) in instructions" :key="index">
            {{ typeof instruction === 'object' && 'text' in instruction ? instruction.text : instruction }}
          </li>
        </template>
        <template v-else-if="typeof instructions === 'string' && instructions.trim()">
          <li v-for="(instruction, index) in instructions.split('\n')" :key="index">
            {{ instruction }}
          </li>
        </template>
        <li v-else>
          Not available
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  const props = defineProps<{
    instructions: Array<{ text?: string } | string> | string
  }>()
  </script>
  