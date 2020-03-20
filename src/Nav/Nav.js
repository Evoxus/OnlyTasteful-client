import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <p><Link to='/'>OnlyTasteful</Link></p>
      <ul>
        <li><Link to='/recipes'>Recipes</Link></li>
        <li><Link to='/signin'>Sign In</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
      </ul>
    </nav>
  )
}

export default Nav;