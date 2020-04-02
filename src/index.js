import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
// Context
import { RecipesProvider } from './context/RecipesContext';
import { RecipeDetailProvider } from './context/RecipeDetailContext';
import './index.css';


ReactDOM.render(
  <RecipesProvider>
    <RecipeDetailProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecipeDetailProvider>
  </RecipesProvider>,
  document.getElementById('root')
);


