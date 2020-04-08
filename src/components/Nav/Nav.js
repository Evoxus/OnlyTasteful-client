import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { ReactComponent as Logo } from '../../svg/cookbook-chef-svgrepo-com.svg';
import OnlyTastefulContext from '../../context/RecipesContext';
import TokenService from '../../services/token-service';
import './Nav.css';

// TODO: Change to hamburger menu on mobile

export default class Nav extends Component {
  state = {
    menuOpen: false,
    screenSize: window.screen.width
  }

  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = OnlyTastefulContext;

  componentDidMount() {
    window.addEventListener('resize', this.handleScreenChange.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenChange.bind(this))
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }

  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }))
  }

  handleScreenChange() {
    this.setState({
      screenSize: window.screen.width
    })
  }

  onSignOut = (e) => {
    e.preventDefault()
    TokenService.clearAuthToken()
    this.context.signOut()
    this.closeMenu()
    this.props.history.push('/')
  }

  render() {
    const { currentUser } = this.context;
    const { screenSize } = this.state;
    return (
      <div className='navBar'>
        { screenSize < 768 ?
        <Menu right isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}>
          <ul>
            <Link className='appName' to='/' onClick={() => this.closeMenu()}>
              <Logo className='logo' />
              <p className='appNameText'>OnlyTasteful</p>
            </Link>
            <li><Link className='navItem' to='/recipes' onClick={() => this.closeMenu()}>Recipes</Link></li>
            {
              currentUser ?
                <>
                  <li>
                    <Link className='navItem' to='/createrecipe'
                      onClick={() => this.closeMenu()}>Create Recipe</Link>
                  </li>
                  <li><Link className='navItem' to='/' onClick={this.onSignOut}>Sign Out</Link></li>
                </> : <>
                  <li><Link className='navItem' to='/signin'
                    onClick={() => this.closeMenu()}>Sign In</Link>
                  </li>
                  <li><Link className='navItem' to='/signup'
                    onClick={() => this.closeMenu()}>Sign Up</Link>
                  </li>
                </>
            }
          </ul>
        </Menu> :
        <nav className='largeScreenNav'>
          <Link className='appName' to='/'>
            <Logo className='logo' />
            <p className='appNameText'>OnlyTasteful</p>
          </Link>
          <ul>
            <li><Link className='navItem' to='/recipes' >Recipes</Link></li>
            {
              currentUser ?
                <>
                  <li>
                    <Link className='navItem' to='/createrecipe'
                    >Create Recipe</Link>
                  </li>
                  <li><Link className='navItem' to='/' onClick={this.onSignOut}>Sign Out</Link></li>
                </> : <>
                  <li><Link className='navItem' to='/signin'
                  >Sign In</Link>
                  </li>
                  <li><Link className='navItem' to='/signup'
                  >Sign Up</Link>
                  </li>
                </>
            }
          </ul>
        </nav>
      }
      </div>
    )
  }
}