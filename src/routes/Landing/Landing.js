import React from 'react';
import './Landing.css';
import { ReactComponent as FoodImg } from '../../svg/vitamins-snack-svgrepo-com.svg';
import { ReactComponent as CreateImg } from '../../svg/writing-edit-svgrepo-com.svg';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <section className="hero">
        <h1>OnlyTasteful</h1>
        <h2>A Cookbook For The Modern Cook!</h2>
      </section>
      <section className="findYourDish">
        <Link to="/recipes" className="hoverEffect findRecipesFlex">
          <div className="left">
            <FoodImg className="foodImg" />
          </div>
          <div className="right">
            <h3>Find Your Next Dish to Cook</h3>
            <p>OnlyTasteful is the digital equivalent of grandma's cookbook.</p>
          </div>
        </Link>
      </section>
      <section className="createRecipes">
        <Link to="/createrecipe" className="hoverEffect createRecipesFlex">
          <div className="right">
            <CreateImg className="createImg" />
          </div>
          <div className="left">
            <h3>Create and Modify Your Own Recipes</h3>
            <p>Add or modify your recipes to build a library of delicious meals.</p>
          </div>
        </Link>
      </section>
    </>
  );
}
