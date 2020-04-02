import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
// Context
import { RecipesProvider } from './context/RecipesContext';
import './index.css';


ReactDOM.render(
  <RecipesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </RecipesProvider>,
  document.getElementById('root')
);


