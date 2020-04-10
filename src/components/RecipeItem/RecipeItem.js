import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeItem.css';

function RecipeItem(props) {
  return (
    <Link className="recipeItemContent" to={`/recipes/${props.data.id}`}>
      <div className="recipeItem">
        <h4 className="recipeItemContent">{props.data.title}</h4>
        <p className="recipeItemContent">Added by: {props.data.user_name}</p>
        <p className="recipeItemContent">
          {props.data.recipe_description.length > 50
            ? props.data.recipe_description.slice(0, 51) + '...'
            : props.data.recipe_description}
        </p>
      </div>
    </Link>
  );
}

export default RecipeItem;

RecipeItem.defaultProps = {
  data: {
    id: 1,
    title: '',
    user_id: 1,
    recipe_description: '',
  },
  users: [{ id: 1 }],
};
