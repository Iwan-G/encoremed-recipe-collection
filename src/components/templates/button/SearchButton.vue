<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-vue-next'
defineProps<{
  search: string
  handleSubmit: () => void
}>()
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <Input
      :value="search"
      type="text"
      placeholder="Search recipes/categories..."
    />
    <Button variant="outline" size="icon" type="submit">
      <SearchIcon class="w-4 h-4" />
    </Button>
  </form>
</template>
