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
// TODO: Mock up user by setting user to true when signin submitted
// TODO: Add create recipe functionality, convert to class component for state
// TODO: Add form validation for signin
// TODO: Add form validation for signup
// TODO: Add form validation for create recipe

/* ---- NOTES ----
  * When user signed in replace signin/signup links with create recipe link and signout
  * When user signed in show buttons for delete and modify on their own recipes
*/

class App extends Component {
  state = {
    recipes: [],
    user: null,
  }

  componentDidMount() {
    this.setState({
      recipes: Recipes,
    })
  }

  onSignIn = (e) => {
    e.preventDefault();
    console.log('signed in');
    // this.setState({
    //   user: true,
    // })
  }

  render() {
    const { recipes } = this.state
    return (
      <div className="App">
        <Nav user={this.state.user}/>
        <Route exact path='/' component={Landing} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} onSignIn={this.onSignIn}/>
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
