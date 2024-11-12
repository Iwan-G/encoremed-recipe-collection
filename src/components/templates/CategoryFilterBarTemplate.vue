<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { categories } from '@/lib/utils/data'

const data = categories
const placeholder = 'Filter by category...'
const open = ref(false)
const searchQuery = ref<string | ''>('')

defineProps<{
  filterValue: string
}>()

const emit = defineEmits(['update:filterValue'])
const handleSelect = (value: string) => {
  emit('update:filterValue', value)
  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
      >
        {{
          filterValue
            ? data?.find(val => val.value === filterValue)?.label
            : placeholder || 'Select option...'
        }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandInput
          :modelValue="searchQuery"
          :placeholder="`Search ${placeholder || 'option'}...`"
        />
        <CommandEmpty>No option found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="item in data?.filter(c =>
                c.label.toLowerCase().includes(searchQuery.toLowerCase()),
              )"
              :key="item.value"
              :value="item.value"
              @select="handleSelect(item.value)"
            >
              <Check
                :class="
                  cn(
                    'mr-2 h-4 w-4',
                    filterValue === item.value ? 'opacity-100' : 'opacity-0',
                  )
                "
              />
              {{ item.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
