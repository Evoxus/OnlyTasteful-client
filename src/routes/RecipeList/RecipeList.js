import React, { Component } from 'react';
import RecipeItem from '../../components/RecipeItem/RecipeItem';
import RecipesContext from '../../context/RecipesContext';
import RecipesApiService from '../../services/recipes-api-service';
import './RecipeList.css';

export default class RecipeList extends Component {
  componentDidMount() {
    this.context.clearError();
    RecipesApiService.getRecipes()
      .then((res) => this.context.setRecipesList(res))
      .catch(this.context.setError);
  }

  static contextType = RecipesContext;

  render() {
    const recipes = this.context.recipes.map((recipe, idx) => (
      <RecipeItem key={idx} data={recipe} />
    ));
    return <section className="recipeList">{recipes}</section>;
  }
}
