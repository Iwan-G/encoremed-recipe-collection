import axios from 'axios';

const API_URL = 'https://raw.githubusercontent.com/micahcochran/json-cookbook/refs/heads/main/cookbook-100.json';

export async function fetchRecipes() {
  try {
    const response = await axios.get(API_URL);
    const recipesWithIds = response.data.map((recipe: any, index: number) => ({
      ...recipe,
      id: index + 1,
    }));
    return recipesWithIds;

  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}
