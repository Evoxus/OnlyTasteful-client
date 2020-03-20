import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeItem.css';

function RecipeItem(props) {
  const userName = props.users.find(user => user.id === props.data.user_id).user_name
  return (
    <div>
      <h4><Link to='/recipes/1'>{props.data.title}</Link></h4>
      <p>{userName}</p>
      <p>[<em>Img placeholder</em>]</p>
      <p>{props.data.description.slice(0, 51) + '...'}</p>
    </div>
  )
}

export default RecipeItem