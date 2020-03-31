import React, { Component } from 'react';
import OnlyTastefulContext from '../../context/OnlyTastefulContext';
import './CreateRecipe.css';
import IngredientInput from '../../components/IngredientInput/IngredientInput';

// TODO: Make POST call to API 

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
    recipe_description: {
      value: '',
      touched: false,
    },
    ingredients: {
      values: [
        {
          quantity: '',
          measurement_name: '',
          ingredient_name: '',
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
      recipe_description: {
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
              ingredient_name: target.value,
              measurement_name: ingredientValues[idx].measurement_name,
              quantity: ingredientValues[idx].quantity,
            },
            ...ingredientValues.slice(idx + 1)
          ],
          touched: true
        }
      })
    } else if (target.id === `measurement_name${idx}`) {
      this.setState({
        ingredients: {
          values: [
            ...ingredientValues.slice(0, idx),
            {
              ingredient_name: ingredientValues[idx].ingredient_name,
              measurement_name: target.value,
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
              ingredient_name: ingredientValues[idx].ingredient_name,
              measurement_name: ingredientValues[idx].measurement_name,
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
      recipe_description: this.state.recipe_description.value,
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
            measurement_name: '',
            ingredient_name: ''
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
                  name='recipe_description' id='recipe_description'
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