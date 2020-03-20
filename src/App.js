import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Landing from './Landing/Landing';
import Footer from './Footer/Footer';
import RecipeList from './RecipeList/RecipeList';
import RecipeDetail from './RecipeDetail/RecipeDetail';
import CreateRecipe from './CreateRecipe/CreateRecipe';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import { Recipes, Users } from './dummy-store';
import { findRecipe } from './recipe-helpers';
import './App.css';

// FIXME: Crash if refresh in recipe or recipe detail (store not updating recipes?)
// TODO: Add create recipe functionality, convert to class component for state
// TODO: Add form validation for signin
// TODO: Add form validation for signup
// TODO: Add form validation for create recipe

/* ---- NOTES ----
  * When user signed in replace signin/signup links with create recipe link 
  * When user signed in show buttons for delete and modify on their own recipes
*/

class App extends Component {
  state = {
    recipes: []
  }

  componentDidMount() {
    this.setState({
      recipes: Recipes,
    })
  }

  render() {
    const { recipes } = this.state
    return (
      <div className="App">
        <Nav />
        <Route exact path='/' component={Landing} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route exact path='/recipes' render={routeProps => {
          return (
            <RecipeList {...routeProps} recipes={recipes} users={Users} />
          )
        }}
        />
        <Route path='/recipes/:recipeId' render={routeProps => {
          const { recipeId } = routeProps.match.params
          const recipe = findRecipe(recipes, recipeId)
          return (
            <RecipeDetail {...routeProps} data={recipe} users={Users} />
          )
        }} />
        <Route path='/createrecipe' component={CreateRecipe} />
        <Footer />
      </div>
    )
  };
}

export default App;
