import React from 'react';
import ReactDOM from 'react-dom';
import RecipeDetail from './RecipeDetail';

describe.skip('RecipeDetail Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecipeDetail />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})