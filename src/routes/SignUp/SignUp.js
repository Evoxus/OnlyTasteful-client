import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import OnlyTastefulContext from '../../context/RecipesContext';
import './SignUp.css';

export default class SignUp extends Component {
  state = {
    error: null,
  }
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = OnlyTastefulContext;

  onSignUp = (e) => {
    e.preventDefault()
    const { user_name, password, full_name } = e.target

    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
      full_name: full_name.value
    })
      .then(res => {
        AuthApiService.postLogin({
          user_name: user_name.value,
          password: password.value
        })
          .then(res => {
            this.setState({
              error: null,
            })
            this.context.signUp(user_name.value)
            TokenService.saveAuthToken(res.authToken)
            this.props.history.push('/recipes')
          })
      }
      )
      .catch(res => this.setState({
        error: res.error,
      }))
  }

  render() {
    return (
      <main role='main' className='signUp'>
        <header>
          <h1>Sign Up</h1>
        </header>
        <section>
          {this.state.error && <div className='errorMsg'>{this.state.error}</div>}
          <form onSubmit={this.onSignUp}>
            <label htmlFor='register_user_name'>Username</label>
            <input type='text' name='user_name' id='register_user_name' />
            <label htmlFor='register_password'>Password</label>
            <input type='password' name='password' id='register_password' />
            <label htmlFor='register_full_name'>Full Name</label>
            <input type='text' name='full_name' id='register_full_name' />
            <button type='submit'>Sign Up</button>
          </form>
        </section>
      </main>
    )
  }
}