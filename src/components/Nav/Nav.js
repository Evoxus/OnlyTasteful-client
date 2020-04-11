import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../svg/cookbook-chef-svgrepo-com.svg';
import OnlyTastefulContext from '../../context/RecipesContext';
import TokenService from '../../services/token-service';
import './Nav.css';

// TODO: Remove react-burger-menu in favor of CSS slide out

export default class Nav extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  static contextType = OnlyTastefulContext;

  toggleMenu = () => {
    document.getElementById('menuToggle').checked = false;
  }

  onSignOut = (e) => {
    e.preventDefault();
    TokenService.clearAuthToken();
    this.context.signOut();
    this.props.history.push('/');
  };

  render() {
    const { currentUser } = this.context;
    return (
      <nav className="menu-wrap">
        <input type='checkbox' className='toggler' id='menuToggle'></input>
        <div className="hamburger">
          <div></div>
        </div>
        <div className="menu" onClick={this.toggleMenu}>
          <div>
            <div>
              <ul>
                <li>
                  <Link to="/">
                    <Logo className='logo' />
                    <p className='appName'>OnlyTasteful</p>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="/recipes">Recipes</Link>
                </li>
                {currentUser ? (
                  <>
                    <li>
                      <Link to="/createrecipe">Create Recipe</Link>
                    </li>
                    <li>
                      <Link onClick={this.onSignOut}>Sign Out</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/signin">Sign In</Link>
                    </li>
                    <li>
                      <Link to="/signup">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
