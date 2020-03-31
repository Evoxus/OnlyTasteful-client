import React, { Component } from 'react';
import RecipeItem from '../../components/RecipeItem/RecipeItem';
import OnlyTastefulContext from '../../context/OnlyTastefulContext';
import './RecipeList.css';

class RecipeList extends Component {
  
  static contextType = OnlyTastefulContext;

  render() {
    const recipes = this.context.recipes.map((recipe, idx) =>
      <RecipeItem key={idx} data={recipe} users={this.context.users} />
    );
    return (
      <section className='recipeList'>
        {recipes}
      </section>
    )
  }
}

export default RecipeList