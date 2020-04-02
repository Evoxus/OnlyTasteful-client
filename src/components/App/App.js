import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// Components
import Nav from '../Nav/Nav';
import Landing from '../../routes/Landing/Landing';
import Footer from '../Footer/Footer';
// Routes
import RecipeList from '../../routes/RecipeList/RecipeList';
import RecipeDetail from '../../routes/RecipeDetail/RecipeDetail';
import CreateRecipe from '../../routes/CreateRecipe/CreateRecipe';
import UpdateRecipe from '../../routes/UpdateRecipe/UpdateRecipe';
import SignIn from '../../routes/SignIn/SignIn';
import SignUp from '../../routes/SignUp/SignUp';
import './App.css';

// TODO: Add form validation for signin
// TODO: Add form validation for signup
// TODO: Add form validation for create recipe
// TODO: Add error boundary and tests

/* ---- NOTES ----
  * When user signed in show buttons for delete and modify on their own recipes, will need auth for this
*/

class App extends Component {
  render() {
    return (
        <div className="App">
          <Nav />
          <Route exact path='/' component={Landing} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
          <Route exact path='/recipes' component={RecipeList} />
          <Route exact path='/recipes/:recipeId' component={RecipeDetail} />
          <Route path='/createrecipe' component={CreateRecipe} />
          <Route path='/recipes/:recipeId/update' component={UpdateRecipe} />
          <Footer />
        </div>
    )
  };
}

export default App;
