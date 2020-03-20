import React from 'react';
import './CreateRecipe.css';

function CreateRecipe() {
  return (
    <main role="main" className='createRecipe'>
      <header>
        <h2>Create/Modify Recipe</h2>
      </header>
      <section>
        <form className='createRecipeForm'>
          <label htmlFor='recipe_title'>Title</label>
          <input type='text' name='title' id='recipe_title' />
          <label htmlFor='ingredient'>Ingredient</label>
          <input type='text' name='ingredient' id='ingredient' />
          <button>+ Add another ingredient</button>
          <label htmlFor='description'>Description</label>
          <textarea name='description' id='description' />
          <label htmlFor='cookingDirections'>Cooking Directions</label>
          <textarea id='cookingDirections' name='cookingDirections'></textarea>
          <input type='submit' />
        </form>
    </section>
  </main>
  )
}

export default CreateRecipe;