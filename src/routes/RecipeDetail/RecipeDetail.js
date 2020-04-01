import React, { Component } from 'react';
import './RecipeDetail.css';
import OnlyTastefulContext from '../../context/OnlyTastefulContext';
import RecipesApiService from '../../services/recipes-api-service';

class RecipeDetail extends Component {

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

  componentDidMount() {
    const { recipeId } = this.props.match.params;
    RecipesApiService.getRecipeDetails(recipeId)
      .then(res => this.setState({
        recipe: res.recipe,
        ingredients: res.ingredients
      }))
  }

  static defaultProps = {
    match: {
      params: {}
    },
    history: {
      push: () => { }
    },
    users: [
      { id: 1 }
    ]
  }

  updateRecipe = () => {
    const { recipeId } = this.props.match.params;
    this.props.history.push(`/recipes/${recipeId}/update`)
  }

  deleteRecipe = () => {
    const { recipeId } = this.props.match.params;
    RecipesApiService.deleteRecipe(recipeId)
      .then(this.context.deleteRecipe(recipeId))
      .then(this.props.history.push('/recipes'))
      .catch(err => console.log(err))
  }

  static contextType = OnlyTastefulContext;

  render() {
    const ingredients = this.state.ingredients.map((ingredient, idx) =>
      <li key={idx}>{ingredient.quantity} {ingredient.measurement} {ingredient.ingredient_name}</li>
    )
    return (
      <main className='RecipeDetail'>
        <header>
          <h2>{this.state.recipe.title}</h2>
          <p>added by: {this.state.recipe.user_name}</p>
        </header>
        <section className="description">
          <p>
            {this.state.recipe.recipe_description}
          </p>
        </section>
        <section>
          <h3>Ingredients List</h3>
          <ul>
            {ingredients}
          </ul>
        </section>
        <section>
          <h3>Cooking Instructions</h3>
          <p>
            {this.state.recipe.instructions}
          </p>
        </section>
        {this.state.recipe.user_name === this.context.currentUser
          ? <>
            <button type='button' className='updateRecipe'
              onClick={this.updateRecipe}>Update Recipe</button>
            <button type='button' className='deleteRecipe'
              onClick={this.deleteRecipe}>Delete Recipe</button>
          </>
          : null
        }
      </main>
    )
  }
}

export default RecipeDetail;