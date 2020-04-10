import config from '../config';
import TokenService from './token-service';

const RecipesApiService = {
  getRecipes() {
    return fetch(`${config.API_ENDPOINT}/recipes`, {
      headers: {},
    }).then((res) => (!res.ok ? res.json().then((err) => Promise.reject(err)) : res.json()));
  },
  getRecipeDetails(recipe_id) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipe_id}`, {
      headers: {},
    }).then((res) => (!res.ok ? res.json().then((err) => Promise.reject(err)) : res.json()));
  },
  postRecipe(newRecipe) {
    return fetch(`${config.API_ENDPOINT}/recipes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title: newRecipe.title,
        recipe_description: newRecipe.recipe_description,
        instructions: newRecipe.instructions,
        ingredients: newRecipe.ingredients,
      }),
    }).then((res) => (!res.ok ? res.json().then((err) => Promise.reject(err)) : res.json()));
  },
  deleteRecipe(recipe_id) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipe_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => (!res.ok ? res.json().then((err) => Promise.reject(err)) : res.ok));
  },
  updateRecipe(updatedRecipe, recipe_id) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipe_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title: updatedRecipe.title,
        recipe_description: updatedRecipe.recipe_description,
        instructions: updatedRecipe.instructions,
        ingredients: updatedRecipe.ingredients,
      }),
    }).then((res) => (!res.ok ? res.json().then((err) => Promise.reject(err)) : res.ok));
  },
};

export default RecipesApiService;
