export const findRecipe = (recipes=[], recipeId) =>
  recipes.find(recipe => recipe.id === parseInt(recipeId))

export const findUser = (users=[], userId) =>
  users.find(user => user.id === parseInt(userId))