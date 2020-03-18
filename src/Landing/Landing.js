import React from 'react';
import './Landing.css';

function Landing() {
  return (
    <main>
      <section className="hero">
        <h1>OnlyTasteful</h1>
        <h2>A cookbook for the modern cook</h2>
      </section>
      <section className="findYourDish">
        <h3>Find your next dish to cook</h3>
        <p>
          [<em>Placeholder for screenshot of view all recipes</em>] OnlyTasteful is the digital
          equivalent of grandma's cookbook.
        </p>
      </section>
      <section className="createRecipes">
        <h3>Create and modify your own recipes</h3>
        <p>
          [<em>Placeholder for gif of create/modify interface</em>]
          Add or modify your recipes to build a library of delicious meals.
        </p>
      </section>
    </main>
  )
}

export default Landing;