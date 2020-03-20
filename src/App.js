import React from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Landing from './Landing/Landing';
import Footer from './Footer/Footer';
import RecipeList from './RecipeList/RecipeList';
import RecipeDetail from './RecipeDetail/RecipeDetail';
import './App.css';
import CreateRecipe from './CreateRecipe/CreateRecipe';

// TODO: Add create recipe component
// TODO: Add Sign in component
// TODO: Add Sign up component

/* ---- NOTES ----
  * When user signed in replace signin/signup links with create recipe link 
  * When user signed in show buttons for delete and modify on their own recipes
*/

function App() {
  return (
    <div className="App">
      <Nav />
        <Route exact path='/' component={Landing} />
        <Route exact path='/recipes' component={RecipeList} />
        <Route path='/recipes/:id' component={RecipeDetail} />
        <Route path='/createrecipe' component={CreateRecipe} />
      <Footer />
    </div>
  );
}

export default App;
