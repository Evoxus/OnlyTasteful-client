import React from 'react';
import './RecipeDetail.css';
import { findUser } from '../recipe-helpers';

function RecipeDetail(props) {
  const ingredients = props.data.ingredients.map((ingredient, idx) => 
    <li key={idx}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
  )
  const username = findUser(props.users, props.data.user_id).user_name
  return(
    <main className='RecipeDetail'>
      <header>
        <h2>{props.data.title}</h2>
        <p>[<em>Img placeholder</em>]</p>
        <p>added by: {username}</p>
      </header>
      <section className="description">
        <p>
          {props.data.description}
        </p>
      </section>
      <section>
        <h3>Ingredients List</h3>
        <ul>
          {ingredients}
        </ul>
      </section>
      <section>
        <h3>Cooking Instructions</h3>
        <p>
          {props.data.instructions}
        </p>
      </section>
    </main>
  )
}

export default RecipeDetail;