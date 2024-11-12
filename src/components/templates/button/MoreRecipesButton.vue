<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <RouterLink to="/recipes">
    <Button
      variant="default"
      size="xs"
      class="w-full flex justify-center items-center rounded-full"
    >
      <p class="text-sm font-medium">More Recipes</p>
    </Button>
  </RouterLink>
</template>
