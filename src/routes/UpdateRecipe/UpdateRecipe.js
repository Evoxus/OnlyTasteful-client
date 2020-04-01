import React, { Component } from 'react';
import IngredientInput from '../../components/IngredientInput/IngredientInput';
import OnlyTastefulContext from '../../context/OnlyTastefulContext';
import RecipesApiService from '../../services/recipes-api-service';
import './UpdateRecipe.css';

export default class UpdateRecipe extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  state = {
    recipe: {
      title: {
        value: '',
        touched: false,
      },
      recipe_description: {
        value: '',
        touched: false,
      },
      instructions: {
        value: '',
        touched: false,
      }
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
  }

  componentDidMount() {
    const { recipeId } = this.props.match.params;
    RecipesApiService.getRecipeDetails(recipeId)
      .then(res => this.setState({
        recipe: {
          title: {
            value: res.recipe.title,
            touched: false,
          },
          recipe_description: {
            value: res.recipe.recipe_description,
            touched: false,
          },
          instructions: {
            value: res.recipe.instructions,
            touched: false,
          },
        },
        ingredients: {
          values: res.ingredients
        }
      }))
      .catch(err => console.log(err))
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
  }


  render() {
    return (
      <main role="main" className='updateRecipe'>
        <header>
          <h2>Update Recipe</h2>
        </header>
        <section>
          <form className='updateRecipeForm' onSubmit={this.onUpdateRecipe}>
            <div className='flexContainer'>
              <div className='leftColumn'>
                <label htmlFor='recipe_title'>Title</label>
                <input
                  type='text' name='title' id='recipe_title' 
                  value={this.state.recipe.title.value}
                  onChange={e => this.updateTitle(e.target.value)}
                />
                <label htmlFor='description'>Description</label>
                <textarea
                  name='recipe_description' id='recipe_description' 
                  value={this.state.recipe.recipe_description.value}
                  onChange={e => this.updateDescription(e.target.value)}
                />
                <label htmlFor='cookingDirections'>Cooking Directions</label>
                <textarea
                  id='cookingDirections' name='cookingDirections' 
                  value={this.state.recipe.instructions.value}
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