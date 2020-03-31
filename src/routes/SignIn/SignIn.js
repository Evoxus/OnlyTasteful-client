import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import OnlyTastefulContext from '../../context/OnlyTastefulContext';
import './SignIn.css';

class SignIn extends Component {
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
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.history.push('/recipes')
      })
      .catch(res => console.log(res.error))
    user_name.value = ''
    password.value = ''
  }

  render() {
    return (
      <main className='signIn'>
        <header>
          <h2>Sign In</h2>
        </header>
        <section>
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

export default SignIn;