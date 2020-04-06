import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
import PrivateRoute from '../Utilities/PrivateRoute';

// TODO: Add form validation for create recipe
// TODO: Alert user they have signed out
// TODO: Add screenshots to landing

export default function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route exact path='/recipes' component={RecipeList} />
        <Route exact path='/recipes/:recipeId' component={RecipeDetail} />
        <PrivateRoute path='/createrecipe' component={CreateRecipe} />
        <PrivateRoute path='/recipes/:recipeId/update' component={UpdateRecipe} />
      </Switch>
      <Footer />
    </div>
  )
}