import React from 'react';
import ReactDOM from 'react-dom';
import UpdateRecipe from './UpdateRecipe';

describe('UpdateRecipe Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UpdateRecipe />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})