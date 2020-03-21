import React, { Component } from 'react';
import OnlyTastefulContext from '../OnlyTastefulContext';
import './CreateRecipe.css';

// TODO: make ingredient list column off to side in desktop

class CreateRecipe extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  state = {
    title: {
      value: '',
      touched: false,
    },
    description: {
      value: '',
      touched: false,
    },
    ingredients: {
      values: [],
      touched: false,
    },
    cookingDirections: {
      value: '',
      touched: false,
    }
  }

  static contextType = OnlyTastefulContext;

  onCreateRecipe = (e) => {
    e.preventDefault()
    const newRecipe = {
      title: this.state.title.value,
      description: this.state.description.value,
      ingredients: this.state.ingredients.values,
      instructions: this.state.cookingDirections.value,
    }
    this.context.createRecipe(newRecipe)
    this.props.history.push('/recipes')
  }

  addIngredient = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <main role="main" className='createRecipe'>
        <header>
          <h2>Create/Modify Recipe</h2>
        </header>
        <section>
          <form className='createRecipeForm' onSubmit={this.onCreateRecipe}>
            <div className='flexContainer'>
              <div className='leftColumn'>
                <label htmlFor='recipe_title'>Title</label>
                <input type='text' name='title' id='recipe_title' />
                <label htmlFor='description'>Description</label>
                <textarea name='description' id='description' />
                <label htmlFor='cookingDirections'>Cooking Directions</label>
                <textarea id='cookingDirections' name='cookingDirections'></textarea>
              </div>
              <div className='rightColumn'>
                <label htmlFor='ingredient1'>Ingredient 1</label>
                <input type='text' name='ingredient1' id='ingredient1' />
                <button onClick={this.addIngredient}>+ Add another ingredient</button>
              </div>
            </div>
            <input type='submit' />
          </form>
        </section>
      </main>
    )
  }
}

export default CreateRecipe;