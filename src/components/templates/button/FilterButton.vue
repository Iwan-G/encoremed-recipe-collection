<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-vue-next'
import CategoryFilterBarTemplate from '../CategoryFilterBarTemplate.vue'
import AnotherFilterBarTemplate from '../AnotherFilterBarTemplate.vue'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ClearFilterButton from './ClearFilterButton.vue'

defineProps<{
  filterValue: string
  anotherFilterValue: string
}>()

const emit = defineEmits([
  'update:filterValue',
  'update:anotherFilterValue',
  'clearSearch',
])

const handleFilterChange = (newValue: string) => {
  emit('update:filterValue', newValue)
}

const handleAnotherFilterChange = (newValue: string) => {
  emit('update:anotherFilterValue', newValue)
}

const clearSearch = () => {
  emit('clearSearch')
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="outline" size="icon">
        <Filter class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="w-full flex flex-col py-7 px-4 gap-2"
      align="start"
    >
      <DropdownMenuItem as-child>
        <CategoryFilterBarTemplate
          :filterValue="filterValue"
          @update:filterValue="handleFilterChange"
        />
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <AnotherFilterBarTemplate
          :filterValue="anotherFilterValue"
          @update:filterValue="handleAnotherFilterChange"
        />
      </DropdownMenuItem>
      <DropdownMenuItem>
        <ClearFilterButton @clearSearch="clearSearch" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
