<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderLayout from './components/HeaderLayout.vue';
import { Toaster } from './components/ui/sonner';

</script>

<template>
  <div class="flex flex-col relative">
    <HeaderLayout />
    <main class="flex-1 px-10 py-5">
      <Toaster position="bottom-right" rich-colors />
      <RouterView />
    </main>
  </div>
</template>
