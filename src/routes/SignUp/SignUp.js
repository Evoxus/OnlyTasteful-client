import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import OnlyTastefulContext from '../../context/RecipesContext';
import './SignUp.css';

// TODO: Form validation

export default class SignUp extends Component {
  state = {
    user_name: {
      value: '',
      touched: false
    },
    password: {
      value: '',
      touched: false,
    },
    full_name: {
      value: '',
      touched: false,
    },
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

  handleUsernameChange = (value) => {
    this.setState({
      user_name: {
        value: value,
        touched: true,
      }
    })
  }

  handlePasswordChange = (value) => {
    this.setState({
      password: {
        value: value,
        touched: true,
      },
    })
  }

  handleFullNameChange = (value) => {
    this.setState({
      full_name: {
        value: value,
        touched: true,
      }
    })
  }

  usernameValidation = () => {
    const { user_name } = this.state
    if (user_name.value.length <= 3) {
      return 'Username must be at least 3 characters long'
    }
    return false
  }

  fullNameValidation = () => {
    const { full_name } = this.state
    if (full_name.value.length <= 3) {
      return 'Full name must be at least 3 characters long'
    }
    return false
  }

  passwordValidation = () => {
    const { password } = this.state
    // eslint-disable-next-line
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/
    if (password.value.length <= 7) {
      return 'Password needs to be 8 or more characters'
    }
    if (password.value.length > 72) {
      return 'Password must be less than 72 characters'
    }
    if (password.value.startsWith(' ') || password.value.endsWith(' ')) {
      return 'Password must not start or end with empty spaces'
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password.value)) {
      return 'Password must contain 1 upper case, lower case, number and special character'
    }
    return false
  }

  render() {
    return (
      <main role='main' className='signUp'>
        <header>
          <h2>Sign Up</h2>
        </header>
        <section>
          {this.state.error && <div className='errorMsg'>{this.state.error}</div>}
          <form className='signUpForm' onSubmit={this.onSignUp}>
            <label htmlFor='register_user_name'>Username</label>
            <input type='text' name='user_name' id='register_user_name'
              onChange={e => this.handleUsernameChange(e.target.value)} />
            {this.state.user_name.touched && <div className='formValidationMsg'>{this.usernameValidation()}</div>}
            <label htmlFor='register_password'>Password</label>
            <input type='password' name='password' id='register_password' 
              onChange={e => this.handlePasswordChange(e.target.value)} />
            {this.state.password.touched && <div className='formValidationMsg'>{this.passwordValidation()}</div>}
            <label htmlFor='register_full_name'>Full Name</label>
            <input type='text' name='full_name' id='register_full_name'
              onChange={e => this.handleFullNameChange(e.target.value)} />
            {this.state.full_name.touched && <div className='formValidationMsg'>{this.fullNameValidation()}</div>}
            <button disabled={this.usernameValidation() || this.passwordValidation() || this.fullNameValidation()}
              type='submit'>Sign Up</button>
          </form>
        </section>
      </main>
    )
  }
}