<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue';
import CartButton from './CartRecipes/CartButton.vue';

</script>

<template>
  <header
    class="flex justify-between items-center w-full h-16 px-5 shadow-lg border-b border-foreground/10 sticky top-0 z-[50] bg-foreground/10 backdrop-blur-md"
  >
    <RouterLink to="/">
      <img alt="Vue logo" src="@/assets/logo.svg" class="w-10 h-10" />
    </RouterLink>

    <nav class="flex gap-4 text-lg font-bold">
      <RouterLink
        to="/"
        class="text-foreground hover:text-foreground/90 transition-all duration-300"
        active-class="text-green-500 underline underline-offset-4"
        >Home
      </RouterLink>
      <RouterLink
        to="/recipes"
        class="text-foreground hover:text-foreground/90 transition-all duration-300"
        active-class="text-green-500 underline underline-offset-4"
        >Recipes
      </RouterLink>
    </nav>

    <div class="flex gap-4">
      <ThemeToggle />
      <CartButton />
    </div>
  </header>
</template>
