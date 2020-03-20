import React from 'react';
import RecipeItem from '../RecipeItem/RecipeItem';
import './RecipeList.css';

function RecipeList(props) {
  const recipes = props.recipes.map((recipe, idx) => 
    <RecipeItem key={idx} data={recipe} users={props.users} />
  );
  return (
    <section className='recipeList'>
      {recipes}
    </section>
  )
}

export default RecipeList