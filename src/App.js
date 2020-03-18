import React from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Landing from './Landing/Landing';
import Footer from './Footer/Footer';
import RecipeList from './RecipeList/RecipeList';
import RecipeDetail from './RecipeDetail/RecipeDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
        <Route exact path='/' component={Landing} />
        <Route exact path='/recipes' component={RecipeList} />
        <Route path='/recipes/:id' component={RecipeDetail} />
      <Footer />
    </div>
  );
}

export default App;
