import React, { Component } from 'react';
import OnlyTastefulContext from '../../context/RecipesContext';
import IngredientInput from '../../components/IngredientInput/IngredientInput';
import RecipesApiService from '../../services/recipes-api-service';
import './CreateRecipe.css';

// TODO: Add ingredient input validation
// TODO: Limit length of input on ingredient input

export default class CreateRecipe extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

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
          measurement: '',
          ingredient_name: '',
        },
      ],
      touched: false,
    },
    instructions: {
      value: '',
      touched: false,
    },
  };

  static contextType = OnlyTastefulContext;

  updateTitle(value) {
    this.setState({
      title: {
        value: value,
        touched: true,
      },
    });
  }

  updateDescription(value) {
    this.setState({
      recipe_description: {
        value: value,
        touched: true,
      },
    });
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
              measurement: ingredientValues[idx].measurement,
              quantity: ingredientValues[idx].quantity,
            },
            ...ingredientValues.slice(idx + 1),
          ],
          touched: true,
        },
      });
    } else if (target.id === `measurement${idx}`) {
      this.setState({
        ingredients: {
          values: [
            ...ingredientValues.slice(0, idx),
            {
              ingredient_name: ingredientValues[idx].ingredient_name,
              measurement: target.value,
              quantity: ingredientValues[idx].quantity,
            },
            ...ingredientValues.slice(idx + 1),
          ],
          touched: true,
        },
      });
    } else if (target.id === `ingredient_quantity${idx}`) {
      this.setState({
        ingredients: {
          values: [
            ...ingredientValues.slice(0, idx),
            {
              ingredient_name: ingredientValues[idx].ingredient_name,
              measurement: ingredientValues[idx].measurement,
              quantity: target.value,
            },
            ...ingredientValues.slice(idx + 1),
          ],
          touched: true,
        },
      });
    }
  };

  updateInstructions(value) {
    this.setState({
      instructions: {
        value: value,
        touched: true,
      },
    });
  }

  onCreateRecipe = (e) => {
    e.preventDefault();
    const newRecipe = {
      title: this.state.title.value,
      recipe_description: this.state.recipe_description.value,
      ingredients: this.state.ingredients.values,
      instructions: this.state.instructions.value,
    };
    RecipesApiService.postRecipe(newRecipe)
      .then((res) => this.props.history.push('/recipes'))
      .catch();
  };

  addIngredient = (e) => {
    e.preventDefault();
    this.setState({
      ingredients: {
        values: [
          ...this.state.ingredients.values,
          {
            quantity: '',
            measurement: '',
            ingredient_name: '',
          },
        ],
      },
    });
  };

  removeIngredients = (index) => {
    const ingredients = this.state.ingredients.values;
    this.setState({
      ingredients: {
        values: [...ingredients.slice(0, index), ...ingredients.slice(index + 1)],
      },
    });
  };

  titleValidation = () => {
    const { title } = this.state;
    if (title.value.length < 3) {
      return 'A recipe requires a title';
    }
    return false;
  };

  instructionsValidation = () => {
    const { instructions } = this.state;
    if (instructions.value < 3) {
      return 'A recipe requires some directions on how to make it';
    }
    return false;
  };

  ingredientsValidation = () => {
    const { ingredients } = this.state;
    if (ingredients.values[0].ingredient_name.length < 3) {
      return 'A recipe requires at least one ingredient';
    }
    // if (ingredients.values.forEach(item => item.ingredient_name.length > 25)) 
    return false;
  };

  render() {
    return (
      <div className="createRecipe">
        <header>
          <h2>Create Recipe</h2>
        </header>
        <section>
          <form className="createRecipeForm" onSubmit={this.onCreateRecipe}>
            <div className="flexContainer">
              <div className="leftColumn">
                <label htmlFor="recipe_title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="recipe_title"
                  onChange={(e) => this.updateTitle(e.target.value)}
                />
                {this.state.title.touched && (
                  <div className="formValidationMsg">{this.titleValidation()}</div>
                )}
                <label htmlFor="description">Description</label>
                <textarea
                  name="recipe_description"
                  id="recipe_description"
                  onChange={(e) => this.updateDescription(e.target.value)}
                />
                <label htmlFor="instructions">Cooking Directions</label>
                <textarea
                  id="instructions"
                  name="instructions"
                  onChange={(e) => this.updateInstructions(e.target.value)}
                ></textarea>
                {this.state.instructions.touched && (
                  <div className="formValidationMsg">{this.instructionsValidation()}</div>
                )}
              </div>
              <div className="rightColumn">
                {this.state.ingredients.touched && (
                  <div className="formValidationMsg">{this.ingredientsValidation()}</div>
                )}
                {this.state.ingredients.values.map((ingredient, idx) => (
                  <IngredientInput
                    key={idx}
                    idx={idx}
                    data={ingredient}
                    arrLength={this.state.ingredients.values.length}
                    handleChange={this.updateIngredients}
                    onClick={(e) => this.removeIngredients(idx)}
                  />
                ))}
                <button onClick={this.addIngredient}>+ Add another ingredient</button>
              </div>
            </div>
            <input
              disabled={
                this.titleValidation() ||
                this.instructionsValidation() ||
                this.ingredientsValidation()
              }
              type="submit"
            />
          </form>
        </section>
      </div>
    );
  }
}
