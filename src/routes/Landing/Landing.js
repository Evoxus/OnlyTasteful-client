import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <main>
      <section className="hero">
        <h1>OnlyTasteful</h1>
        <h2>A cookbook for the modern cook</h2>
      </section>
      <section className="findYourDish">
        <Link to='/recipes' className='hoverEffect'>
          <h3>Find your next dish to cook</h3>
          <p>
            [<em>Placeholder for screenshot of view all recipes</em>] OnlyTasteful is the digital
          equivalent of grandma's cookbook.
        </p>
        </Link>
      </section>
      <section className="createRecipes">
        <Link to='/createrecipe' className='hoverEffect'>
          <h3>Create and modify your own recipes</h3>
          <p>
            [<em>Placeholder for gif of create/modify interface</em>]
          Add or modify your recipes to build a library of delicious meals.
        </p>
        </Link>
      </section>
    </main>
  )
}