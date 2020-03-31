import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OnlyTastefulContext from '../../context/OnlyTastefulContext';
import TokenService from '../../services/token-service';
import './Nav.css';


export default class Nav extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = OnlyTastefulContext;

  onSignOut = (e) => {
    e.preventDefault()
    TokenService.clearAuthToken()
    this.context.signOut()
    this.props.history.push('/')
  }

  render() {
    // const { currentUser } = this.context;
    return (
      <nav>
        <p><Link to='/'>OnlyTasteful</Link></p>
        <ul>
          <li><Link to='/recipes'>Recipes</Link></li>
          {
            TokenService.hasAuthToken() ?
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