import React, { Component } from 'react';
import RecipeContext from '../../context/RecipesContext';
import RecipesApiService from '../../services/recipes-api-service';
import './RecipeDetail.css';

export default class RecipeDetail extends Component {
  componentDidMount() {
    const { recipeId } = this.props.match.params;
    RecipesApiService.getRecipeDetails(recipeId)
      .then((res) => {
        this.context.setRecipeDetails(res.recipe, res.ingredients);
      })
      .catch((err) => this.context.setError(err));
  }

  static contextType = RecipeContext;

  static defaultProps = {
    match: {
      params: {},
    },
    history: {
      push: () => {},
    },
    users: [{ id: 1 }],
  };

  updateRecipe = () => {
    const { recipeId } = this.props.match.params;
    this.props.history.push(`/recipes/${recipeId}/update`);
  };

  handleDeleteRecipe = () => {
    const { recipeId } = this.props.match.params;
    RecipesApiService.deleteRecipe(recipeId)
      .then((res) => {
        this.context.deleteRecipe(recipeId);
      })
      .then(this.props.history.push('/recipes'))
      .catch((err) => console.log(err));
  };

  render() {
    const ingredients = this.context.recipeDetails.ingredients.map((ingredient, idx) => (
      <li className="ingredient" key={idx}>
        {ingredient.quantity} {ingredient.measurement} {ingredient.ingredient_name}
      </li>
    ));
    const recipe = this.context.recipeDetails.recipe;
    return (
      <div className="RecipeDetail">
        <header>
          <h2>{recipe.title}</h2>
          <p>Added by: {recipe.user_name}</p>
        </header>
        <section className="description">
          <p>{recipe.recipe_description}</p>
        </section>
        <section>
          <h3>Ingredients List</h3>
          <ul className="ingredientsList">{ingredients}</ul>
        </section>
        <section>
          <h3>Cooking Instructions</h3>
          <div className="instructions">
            {recipe.instructions.split(/\n \r|\n/).map((instructions, idx) => (
              <p key={idx}>{instructions}</p>
            ))}
          </div>
        </section>
        {recipe.user_name === this.context.currentUser ? (
          <>
            <button type="button" className="updateRecipe" onClick={this.updateRecipe}>
              Update Recipe
            </button>
            <button type="button" className="deleteRecipe" onClick={this.handleDeleteRecipe}>
              Delete Recipe
            </button>
          </>
        ) : null}
      </div>
    );
  }
}
