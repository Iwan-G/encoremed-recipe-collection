export interface Recipe {
    '@context': string
    '@type': string
    name: string
    url: string
    image: string[]
    author: {
      '@type': string
      name: string
    }
    datePublished: string
    dateModified: string
    description: string
    prepTime: string
    cookTime: string
    totalTime: string
    keywords: string
    recipeCuisine: string
    recipeCategory: string
    nutrition: {
      '@type': string
      fatContent: number
      fiberContent: number
      carbohydrateContent: number
      proteinContent: number
      cholesterolContent: number
    }
    recipeIngredient: string[]
    recipeInstructions: {
      '@type': string
      text: string
    }[]
    recipeYield: string
    publisher: {
      '@type': string
      name: string
      logo: {
        '@type': string
        url: string
        width: number
        height: number
      }
    }
  }
  