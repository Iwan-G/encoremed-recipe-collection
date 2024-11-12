<script setup lang="ts">
import { ref } from 'vue'
import { SearchIcon, XIcon } from 'lucide-vue-next'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const props = defineProps<{
  search: string
}>()

const emit = defineEmits<{
  (e: 'search', value: string): void
  (e: 'clearSearch'): void
}>()

const searchInput = ref(props.search)

const clearSearch = () => {
  emit('clearSearch')
}

const handleSubmit = () => {
  emit('search', searchInput.value)
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="relative flex justify-end items-center gap-2"
  >
    <Input
      v-model="searchInput"
      placeholder="Search recipes..."
      class="w-[80%]"
    />
    <XIcon
      v-if="searchInput"
      class="w-4 h-4 cursor-pointer absolute right-14 top-3"
      @click="clearSearch"
    />
    <Button variant="default" size="icon" type="submit">
      <SearchIcon class="w-4 h-4" />
    </Button>
  </form>
</template>
