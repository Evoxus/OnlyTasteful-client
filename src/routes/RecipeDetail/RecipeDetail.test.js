import React from 'react';
import ReactDOM from 'react-dom';
import RecipeDetail from './RecipeDetail';
import { RecipesProvider } from '../../context/RecipesContext';

describe('RecipeDetail Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <RecipesProvider>
        <RecipeDetail />
      </RecipesProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
