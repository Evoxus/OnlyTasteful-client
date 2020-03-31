import config from '../config';
import TokenService from '../services/token-service';

const RecipesApiService = {
  getRecipes() {
    return fetch(`${config.API_ENDPOINT}/recipes`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },
  getRecipeDetails(recipe_id) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipe_id}`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },
  postRecipe(title, recipe_description, instructions, ingredients) {
    return fetch(`${config.API_ENDPOINT}/recipes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title,
        recipe_description,
        instructions,
        ingredients
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },
  deleteRecipe(recipe_id) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipe_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },
  updateRecipe(title, recipe_description, instructions, ingredients, recipe_id) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipe_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title,
        recipe_description,
        instructions,
        ingredients
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },
}

export default RecipesApiService