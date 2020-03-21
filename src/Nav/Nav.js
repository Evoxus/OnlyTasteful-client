import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav(props) {
  return (
    <nav>
      <p><Link to='/'>OnlyTasteful</Link></p>
      <ul>
        <li><Link to='/recipes'>Recipes</Link></li>
        {
        !props.user ? 
        <>
          <li><Link to='/signin'>Sign In</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li> 
        </>: <>
          <li><Link to='/createrecipe'>Create Recipe</Link></li>
          <li><Link to='/'>Sign Out</Link></li>
        </>
        }
        
      </ul>
    </nav>
  )
}

export default Nav;