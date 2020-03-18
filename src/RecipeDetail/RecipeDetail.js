import React from 'react';
import './RecipeDetail.css';

function RecipeDetail() {
  return(
    <main className='RecipeDetail'>
      <header>
        <h2>RecipeTitle</h2>
        <p>[<em>Img placeholder</em>]</p>
        <p>added by: UserName</p>
      </header>
      <section className="description">
        <p>
          Spicy jalapeno bacon ipsum dolor amet est dolore voluptate ham hock tenderloin proident 
          cupidatat irure veniam drumstick shankle eu labore. Sunt alcatra pork velit bacon rump proident 
          dolore drumstick beef nostrud ham dolore. Ea aute elit beef duis shank, occaecat nisi pork proident 
          alcatra tail enim ribeye. Venison andouille ea brisket eu tongue. Chicken picanha andouille, swine 
          nostrud consequat hamburger cupim tri-tip mollit magna voluptate kielbasa landjaeger eu. Esse 
          hamburger mollit exercitation t-bone nulla kevin meatloaf. Fugiat non lorem buffalo hamburger sed, 
          drumstick tongue aliquip labore consectetur venison in sint alcatra.
        </p>
      </section>
      <section>
        <h3>Ingredients List</h3>
        <ul>
          <li>ingredient 1</li>
          <li>ingredient 2</li>
          <li>ingredient 3</li>
        </ul>
      </section>
      <section>
        <h3>Cooking Instructions</h3>
        <p>
          Spicy jalapeno bacon ipsum dolor amet est dolore voluptate ham hock tenderloin proident 
          cupidatat irure veniam drumstick shankle eu labore. Sunt alcatra pork velit bacon rump proident 
          dolore drumstick beef nostrud ham dolore. Ea aute elit beef duis shank, occaecat nisi pork proident 
          alcatra tail enim ribeye. Venison andouille ea brisket eu tongue. Chicken picanha andouille, swine 
          nostrud consequat hamburger cupim tri-tip mollit magna voluptate kielbasa landjaeger eu. Esse 
          hamburger mollit exercitation t-bone nulla kevin meatloaf. Fugiat non lorem buffalo hamburger sed, 
          drumstick tongue aliquip labore consectetur venison in sint alcatra.
        </p>
      </section>
    </main>
  )
}

export default RecipeDetail;