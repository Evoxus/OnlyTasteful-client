import React, { Component } from 'react'

const RecipesContext = React.createContext({
  recipes: [],
  currentUser: null,
  recipeDetails: {},
  ingredients: [],
  setError: () => {},
  clearError: () => {},
  signIn: () => {},
  signOut: () => {},
  createRecipe: () => {},
  addRecipe: () => {},
  deleteRecipe: () => {},
  setRecipeList: () => {},
  setRecipeDetails: () => {},
  updateRecipe: () => {},
  updateIngredients: () => {},
})

export default RecipesContext

export class RecipesProvider extends Component {
  state = {
    recipes: [],
    currentUser: false,
    recipeDetails: {
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
    },
    error: null,
  }



  setRecipesList = recipes => {
    this.setState( { recipes })
  }

  setError = error => {
    console.log(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  handleSignIn = (user_name) => {
    this.setState({
      currentUser: user_name,
    })
  }

  handleSignUp = (user_name) => {
    this.setState({
      currentUser: user_name,
    })
  }

  handleSignOut = () => {
    this.setState({
      currentUser: null,
    })
  }

  handleCreateRecipe = (newRecipe) => {
    this.setState({
      recipes: [...this.state.recipes, newRecipe]
    })
  }

  handleDeleteRecipe = (recipe_id) => {
    this.setState({
      recipes: this.state.recipes.filter(item => item.id !== parseInt(recipe_id))
    })
  }

  handleSetRecipeDetails = (recipe, ingredients) => {
    this.setState({
      recipeDetails: {
        recipe: recipe,
        ingredients: ingredients
      }
    })
  }

  render() {
    const value = {
      recipes: this.state.recipes,
      setRecipesList: this.setRecipesList,
      currentUser: this.state.currentUser,
      recipeDetails: this.state.recipeDetails,
      signIn: this.handleSignIn,
      signUp: this.handleSignUp,
      signOut: this.handleSignOut,
      addRecipe: this.handleCreateRecipe,
      deleteRecipe: this.handleDeleteRecipe,
      setRecipeDetails: this.handleSetRecipeDetails,
      setError: this.setError,
      clearError: this.clearError
    }
    return (
      <RecipesContext.Provider value={value}>
        { this.props.children }
      </RecipesContext.Provider>
    )
  }
}