import React from 'react';
import ReactDOM from 'react-dom';
import RecipeList from './RecipeList';

describe('RecipeList Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecipeList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
