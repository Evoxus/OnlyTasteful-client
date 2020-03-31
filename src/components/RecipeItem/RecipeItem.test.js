import React from 'react';
import ReactDOM from 'react-dom';
import RecipeItem from './RecipeItem';
import { BrowserRouter } from 'react-router-dom';

describe('RecipeItem Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter> <RecipeItem /> </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})