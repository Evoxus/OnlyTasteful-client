import React from 'react';
import RecipeItem from '../RecipeItem/RecipeItem';
import './RecipeList.css';

function RecipeList() {
  const recipes = <>
    <RecipeItem key='1' />
    <RecipeItem key='2' />
    <RecipeItem key='3' />
    <RecipeItem key='4' />
  </>;
  return (
    <section className='recipeList'>
      {recipes}
    </section>
  )
}

export default RecipeList