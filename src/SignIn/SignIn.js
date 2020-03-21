import React, { Component } from 'react';
import OnlyTastefulContext from '../OnlyTastefulContext';
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
    this.context.signIn()
    this.props.history.push('/')
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