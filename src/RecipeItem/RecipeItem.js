import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeItem.css';
import { findUser } from '../recipe-helpers';

function RecipeItem(props) {
  const userName = findUser(props.users, props.data.user_id).user_name
  return (
    <div>
      <h4><Link to={`/recipes/${props.data.id}`}>{props.data.title}</Link></h4>
      <p>{userName}</p>
      <p>[<em>Img placeholder</em>]</p>
      <p>{props.data.description.slice(0, 51) + '...'}</p>
    </div>
  )
}

export default RecipeItem