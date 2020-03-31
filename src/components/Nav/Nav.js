import React, { Component } from 'react';
import OnlyTastefulContext from '../../context/OnlyTastefulContext';
import './Nav.css';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = OnlyTastefulContext;

  onSignOut = (e) => {
    e.preventDefault()
    this.context.signOut()
    this.props.history.push('/')
  }

  render() {
    const { currentUser } = this.context;
    return (
      <nav>
        <p><Link to='/'>OnlyTasteful</Link></p>
        <ul>
          <li><Link to='/recipes'>Recipes</Link></li>
          {
            currentUser ?
              <>
                <li><Link to='/createrecipe'>Create Recipe</Link></li>
                <li><Link to='/' onClick={this.onSignOut}>Sign Out</Link></li>
              </> : <>
                <li><Link to='/signin'>Sign In</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
              </>
          }
        </ul>
      </nav>
    )
  }
}