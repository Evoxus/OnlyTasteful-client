import React, { Component } from 'react';
import OnlyTastefulContext from '../OnlyTastefulContext';
import './CreateRecipe.css';
import IngredientInput from '../IngredientInput/IngredientInput';

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
        {
          quantity: '',
          unit: '',
          name: '',
        },
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

  updateIngredients = (target, idx) => {
    const ingredientValues = this.state.ingredients.values;
    if (target.id === `ingredient_name${idx}`) {
      this.setState({
        ingredients: {
          values: [
            ...ingredientValues.slice(0, idx),
            {
              name: target.value,
              unit: ingredientValues[idx].unit,
              quantity: ingredientValues[idx].quantity,
            },
            ...ingredientValues.slice(idx + 1)
          ],
          touched: true
        }
      })
    } else if (target.id === `ingredient_unit${idx}`) {
      this.setState({
        ingredients: {
          values: [
            ...ingredientValues.slice(0, idx),
            {
              name: ingredientValues[idx].name,
              unit: target.value,
              quantity: ingredientValues[idx].quantity,
            },
            ...ingredientValues.slice(idx + 1)
          ],
          touched: true
        }
      })
    } else if (target.id === `ingredient_quantity${idx}`) {
      this.setState({
        ingredients: {
          values: [
            ...ingredientValues.slice(0, idx),
            {
              name: ingredientValues[idx].name,
              unit: ingredientValues[idx].unit,
              quantity: target.value,
            },
            ...ingredientValues.slice(idx + 1)
          ],
          touched: true
        }
      })
    }
  }

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
        values: [
          ...this.state.ingredients.values,
          {
            quantity: '',
            unit: '',
            name: ''
          },
        ],
      },
    })
  }

  removeIngredients = (index) => {
    const ingredients = this.state.ingredients.values
    this.setState({
      ingredients: {
        values: [
          ...ingredients.slice(0, index),
          ...ingredients.slice(index + 1)
        ]
      }
    })
  };

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
                  <IngredientInput key={idx} idx={idx} 
                    data={ingredient} arrLength={this.state.ingredients.values.length}
                    handleChange={this.updateIngredients} onClick={e => this.removeIngredients(idx)}
                  />
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