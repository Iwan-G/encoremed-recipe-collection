import { createRouter, createWebHistory } from 'vue-router'

import RecipeView from '@/views/RecipeView.vue'

import HomeView from '@/views/HomeView.vue'
import RecipeDetailView from '@/views/RecipeDetailView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: RecipeView,
    },
    {
      path: '/recipe-detail/:slug',
      name: 'recipe-detail',
      component: RecipeDetailView,
    },
  ],
})

export default router
