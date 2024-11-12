<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode({
  disableTransition: false,
  modes: {
    cafe: 'cafe',
  },
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child size="icon">
      <Button variant="outline">
        <Icon
          icon="radix-icons:sun"
          class="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <Icon
          icon="radix-icons:moon"
          class="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <!-- TO DO Set a cafe icon and bind the correct icon to the theme -->
        <Icon
          icon="radix-icons:cookie"
          class="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all cafe:rotate-0 cafe:scale-100"
        />

        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="z-[999]">
      <DropdownMenuItem @click="mode = 'light'"> Light </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'"> Dark </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'cafe'"> Cafe </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
