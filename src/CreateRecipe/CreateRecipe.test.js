import React from 'react';
import ReactDOM from 'react-dom';
import CreateRecipe from './CreateRecipe';

describe('CreateRecipe Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateRecipe />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})