import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import OnlyTastefulContext from '../../context/RecipesContext';
import './SignIn.css';

export default class SignIn extends Component {
  state = {
    error: null,
  }
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = OnlyTastefulContext;

  onSignIn = (e) => {
    e.preventDefault()
    const { user_name, password } = e.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
      .then(res => {
        this.setState({
          error: null,
        })
        this.context.signIn(user_name.value)
        TokenService.saveAuthToken(res.authToken)
        this.props.history.push('/recipes')
      })
      .catch(res => this.setState({
        error: res.error,
      }))
  }

  render() {
    return (
      <main className='signIn'>
        <header>
          <h2>Sign In</h2>
        </header>
        <section>
          { this.state.error && <div className='errorMsg'>{this.state.error}</div>}
        <form onSubmit={this.onSignIn}>
          <label htmlFor='signin_user_name'>Username</label>
          <input type='text' name='user_name' id='signin_user_name' />
          <label htmlFor='signin_password'>Password</label>
          <input type='password' name='password' id='signin_password' />
          <button type='submit'>Sign In</button>
        </form>
      </section>
      </main>
    )
  }
}