import React, { Component } from 'react';

const RecipeDetailContext = React.createContext({
  recipe: {},
  ingredients: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  
})

export default RecipeDetailContext

export class RecipeDetailProvider extends Component {
  state = {
    recipe: {
      id: 1,
      user_name: '',
      title: '',
      description: '',
      instructions: ''
    },
    ingredients: [
      {
        ingredient_name: '',
        quantity: 1,
        measurement: '',
      }
    ],
  }

  setError = () => {

  }

  clearError = () => {

  }

  

  

  render() {
    const value = {
      recipe: this.state.recipe,
      ingredients: this.state.ingredients,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setRecipe: this.setRecipe,
      setIngredients: this.setIngredients,
      updateRecipe: this.updateRecipe,
      updateIngredients: this.updateIngredients,
    }
    return(
      <RecipeDetailContext.Provider value={value}>
        { this.props.children }
      </RecipeDetailContext.Provider>
    )
  }
}