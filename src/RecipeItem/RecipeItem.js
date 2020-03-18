import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeItem.css';

function RecipeItem() {
  return (
    <div>
      <h4><Link to='/recipes/1'>RecipeTitle</Link></h4>
      <p>RecipeAuthor</p>
      <p>[<em>Img placeholder</em>]</p>
      <p>Short Description</p>
    </div>
  )
}

export default RecipeItem