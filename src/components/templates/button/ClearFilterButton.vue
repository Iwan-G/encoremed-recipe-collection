<script setup lang="ts">
import { Button } from '@/components/ui/button'

const emit = defineEmits<{
  (e: 'clearSearch'): void
}>()

const clearSearch = () => {
  emit('clearSearch')
}
</script>

<template>
  <Button
    variant="destructive"
    class="w-full flex justify-center items-center cursor-pointer"
    @click="clearSearch"
  >
    Clear Filters
  </Button>
</template>
