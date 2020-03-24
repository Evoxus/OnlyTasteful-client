import React, { Component } from 'react';
import './RecipeDetail.css';
import { findUser, findRecipe } from '../recipe-helpers';
import OnlyTastefulContext from '../OnlyTastefulContext';

class RecipeDetail extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = OnlyTastefulContext;

  render() {
    const { recipeId } = this.props.match.params;
    const { users } = this.context;
    const recipe = findRecipe(this.context.recipes, recipeId)
    const ingredients = recipe.ingredients.map((ingredient, idx) =>
      <li key={idx}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
    )
    const username = findUser(users, recipe.user_id).user_name
    return (
      <main className='RecipeDetail'>
        <header>
          <h2>{recipe.title}</h2>
          <p>[<em>Img placeholder</em>]</p>
          <p>added by: {username}</p>
        </header>
        <section className="description">
          <p>
            {recipe.description}
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
            {recipe.instructions}
          </p>
        </section>
      </main>
    )
  }
}

export default RecipeDetail;