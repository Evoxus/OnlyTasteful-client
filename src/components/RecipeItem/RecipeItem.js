import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeItem.css';

function RecipeItem(props) {
  return (
    <div className='recipeItem'>
      <h4><Link to={`/recipes/${props.data.id}`}>{props.data.title}</Link></h4>
      <p>Added by: {props.data.user_name}</p>
      <p>{props.data.recipe_description.slice(0, 51) + '...'}</p>
    </div>
  )
}

export default RecipeItem

RecipeItem.defaultProps = {
  data: {
    id: 1,
    title: '',
    user_id: 1,
    description: '',
  },
  users: [
    { id: 1 }
  ]
}