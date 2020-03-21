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
      values: [
        '',
      ],
      touched: false,
    },
    cookingDirections: {
      value: '',
      touched: false,
    }
  }

  static contextType = OnlyTastefulContext;

  updateTitle(value) {
    this.setState({
      title: {
        value: value,
        touched: true
      }
    })
  }

  updateDescription(value) {
    this.setState({
      description: {
        value: value,
        touched: true
      }
    })
  }

  updateIngredients = (ingredients, index, ingredient) => [
    ...ingredients.slice(0, index),
    ingredient,
    ...ingredients.slice(index + 1)
  ];

  updateCookingDirections(value) {
    this.setState({
      cookingDirections: {
        value: value,
        touched: true
      }
    })
  }

  onCreateRecipe = (e) => {
    e.preventDefault()
    const newRecipe = {
      id: this.context.recipes.length + 1,
      title: this.state.title.value,
      description: this.state.description.value,
      ingredients: this.state.ingredients.values,
      instructions: this.state.cookingDirections.value,
      user_id: 2,
    }
    this.context.createRecipe(newRecipe)
    this.props.history.push('/recipes')
  }

  addIngredient = (e) => {
    e.preventDefault()
    this.setState({
      ingredients: {
        values: [...this.state.ingredients.values, '']
      }
    })
  }

  removeIngredients = (ingredients, index) => [
    ...ingredients.slice(0, index),
    ...ingredients.slice(index + 1)
  ];

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
                <input
                  type='text' name='title' id='recipe_title'
                  onChange={e => this.updateTitle(e.target.value)}
                />
                <label htmlFor='description'>Description</label>
                <textarea
                  name='description' id='description'
                  onChange={e => this.updateDescription(e.target.value)}
                />
                <label htmlFor='cookingDirections'>Cooking Directions</label>
                <textarea
                  id='cookingDirections' name='cookingDirections'
                  onChange={e => this.updateCookingDirections(e.target.value)}
                ></textarea>
              </div>
              <div className='rightColumn'>
                {this.state.ingredients.values.map((ingredient, idx) =>
                  <React.Fragment key={idx}>
                    <label htmlFor={`ingredient${idx}`}>Ingredient {idx + 1}</label>
                    <input type='text' name={`ingredient${idx}`} id={`ingredient${idx}`} 
                    onChange={e => this.setState({
                      ingredients: {
                        values: this.updateIngredients(this.state.ingredients.values, idx, e.target.value)
                      },
                    })} />
                    {!!idx && (
                      <button type="button"
                        onClick={() =>
                          this.setState({
                            ingredients:
                            { 
                              values: this.removeIngredients(
                                this.state.ingredients.values,
                                idx
                              )
                            }
                          })
                        }>Remove Ingredient</button>
                    )}
                  </React.Fragment>
                )}
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