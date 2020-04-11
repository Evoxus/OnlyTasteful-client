import React, { Component } from 'react';
import IngredientInput from '../../components/IngredientInput/IngredientInput';
import OnlyTastefulContext from '../../context/RecipesContext';
import RecipesApiService from '../../services/recipes-api-service';
import './UpdateRecipe.css';

// TODO: Add ingredient input validation
// TODO: Limit length of input on ingredient input

export default class UpdateRecipe extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
    match: {
      params: {},
    },
  };

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
      },
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
  };

  componentDidMount() {
    const { recipeId } = this.props.match.params;
    RecipesApiService.getRecipeDetails(recipeId)
      .then((res) =>
        this.setState({
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
            values: res.ingredients,
          },
        })
      )
      .catch((err) => console.log(err));
  }

  static contextType = OnlyTastefulContext;

  updateTitle(value) {
    const recipe = this.state.recipe;
    this.setState({
      recipe: {
        title: {
          value: value,
          touched: true,
        },
        recipe_description: recipe.recipe_description,
        instructions: recipe.instructions,
      },
    });
  }

  updateDescription(value) {
    const recipe = this.state.recipe;
    this.setState({
      recipe: {
        title: recipe.title,
        recipe_description: {
          value: value,
          touched: true,
        },
        instructions: recipe.instructions,
      },
    });
  }

  updateInstructions(value) {
    const recipe = this.state.recipe;
    this.setState({
      recipe: {
        title: recipe.title,
        recipe_description: recipe.recipe_description,
        instructions: {
          value: value,
          touched: true,
        },
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

  onUpdateRecipe = (e) => {
    e.preventDefault();
    const { recipeId } = this.props.match.params;
    const recipe = this.state.recipe;
    const updatedRecipe = {
      title: recipe.title.value,
      recipe_description: recipe.recipe_description.value,
      instructions: recipe.instructions.value,
      ingredients: this.state.ingredients.values,
    };
    RecipesApiService.updateRecipe(updatedRecipe, recipeId)
      .then(
        this.context.setRecipeDetails(
          {
            title: updatedRecipe.title,
            recipe_description: updatedRecipe.recipe_description,
            instructions: updatedRecipe.instructions,
            id: this.context.recipeDetails.recipe.id,
            user_name: this.context.recipeDetails.recipe.user_name,
          },
          updatedRecipe.ingredients
        )
      )
      .then((res) => {
        // A little hack to make it update correctly
        // (for some reason the update takes an avg 300ms to complete)
        let that = this;
        setTimeout(function () {
          that.props.history.push(`/recipes/${recipeId}/`);
        }, 500);
      })
      .catch((err) => this.context.setError(err));
  };

  titleValidation = () => {
    const { title } = this.state.recipe;
    if (title.value.length < 3) {
      return 'A recipe requires a title';
    }
    return false;
  };

  instructionsValidation = () => {
    const { instructions } = this.state.recipe;
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
    return false;
  };

  render() {
    return (
      <div className="updateRecipeRoute">
        <header>
          <h2>Update Recipe</h2>
        </header>
        <section>
          <form className="updateRecipeForm" onSubmit={this.onUpdateRecipe}>
            <div className="flexContainer">
              <div className="leftColumn">
                <label htmlFor="recipe_title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="recipe_title"
                  defaultValue={this.state.recipe.title.value}
                  onChange={(e) => this.updateTitle(e.target.value)}
                />
                {this.state.recipe.title.touched && (
                  <div className="formValidationMsg">{this.titleValidation()}</div>
                )}
                <label htmlFor="description">Description</label>
                <textarea
                  name="recipe_description"
                  id="recipe_description"
                  defaultValue={this.state.recipe.recipe_description.value}
                  onChange={(e) => this.updateDescription(e.target.value)}
                />
                <label htmlFor="instructions">Cooking Directions</label>
                <textarea
                  id="instructions"
                  name="instructions"
                  defaultValue={this.state.recipe.instructions.value}
                  onChange={(e) => this.updateInstructions(e.target.value)}
                ></textarea>
                {this.state.recipe.instructions.touched && (
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
