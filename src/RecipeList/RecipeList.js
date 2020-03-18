import React from 'react';
import './RecipeList.css';

function RecipeList() {
  const recipes = <p>This is a recipe</p>;
  return (
    <section className='recipeList'>
      {recipes}
    </section>
  )
}

export default RecipeList