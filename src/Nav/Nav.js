import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <p>OnlyTasteful</p>
      <ul>
        <li><Link to='/recipes'>Recipes</Link></li>
        <li>Sign In</li>
        <li>Sign Up</li>
      </ul>
    </nav>
  )
}

export default Nav;