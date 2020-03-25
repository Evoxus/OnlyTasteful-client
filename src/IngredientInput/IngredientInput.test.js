import React from 'react';
import ReactDOM from 'react-dom';
import IngredientInput from './IngredientInput';

describe('IngredientInput Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<IngredientInput />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})