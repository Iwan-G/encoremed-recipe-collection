import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import { Recipe } from '../lib/utils/Interfaces'

export const useSavedRecipesStore = defineStore('savedRecipes', {
  state: () => ({
    savedRecipes: JSON.parse(
      localStorage.getItem('savedRecipes') ?? '[]',
    ) as Recipe[],
  }),

  getters: {
    getSavedRecipes(state): Recipe[] {
      return state.savedRecipes
    },
  },
  actions: {
    setSavedRecipes(recipe: Recipe) {
      if (!this.savedRecipes.some(r => r.name === recipe.name)) {
        this.savedRecipes.push(recipe)
        this.saveToLocalStorage()
        toast.success(`${recipe.name} added to saved recipes`)
      } else {
        toast.error(`${recipe.name} already in saved recipes`)
      }
    },
    removeSavedRecipe(recipe: Recipe) {
      this.savedRecipes = this.savedRecipes.filter(r => r.name !== recipe.name)
      this.saveToLocalStorage()
      toast.success(`${recipe.name} removed from saved recipes`)
    },
    clearSavedRecipesStore() {
      this.$reset()
      this.saveToLocalStorage()
    },
    isRecipeSaved(recipe: Recipe) {
      return this.savedRecipes.some(r => r.name === recipe.name)
    },
    savedRecipesCount() {
      return this.savedRecipes.length
    },
    saveToLocalStorage() {
      localStorage.setItem('savedRecipes', JSON.stringify(this.savedRecipes))
    },
  },
})
