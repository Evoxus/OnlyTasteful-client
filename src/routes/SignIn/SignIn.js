import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import OnlyTastefulContext from '../../context/RecipesContext';
import './SignIn.css';

export default class SignIn extends Component {
  state = {
    user_name: {
      value: '',
      touched: false,
    },
    password: {
      value: '',
      touched: false,
    },
    error: null,
  };

  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  static contextType = OnlyTastefulContext;

  onSignIn = (e) => {
    e.preventDefault();
    const { user_name, password } = e.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        this.setState({
          error: null,
        });
        this.context.signIn(user_name.value);
        TokenService.saveAuthToken(res.authToken);
        this.props.history.push('/recipes');
      })
      .catch((res) =>
        this.setState({
          error: res.error,
        })
      );
  };

  handleUsernameChange = (value) => {
    this.setState({
      user_name: {
        value: value,
        touched: true,
      },
    });
  };

  handlePasswordChange = (value) => {
    this.setState({
      password: {
        value: value,
        touched: true,
      },
    });
  };

  usernameValidation = () => {
    const { user_name } = this.state;
    if (user_name.value.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    return false;
  };

  passwordValidation = () => {
    const { password } = this.state;
    if (password.value.length <= 7) {
      return 'Password needs to be 8 or more characters';
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters';
    }
    if (password.value.startsWith(' ') || password.value.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    return false;
  };

  render() {
    return (
      <div className="signIn">
        <header>
          <h2>Sign In</h2>
          <p className="demoUserCredentials">
            If you don't wish to register an account you can sign in as
          </p>
          <p className="demoUserCredentials">
            <strong>Username</strong>: demo
          </p>
          <p className="demoUserCredentials">
            <strong>Password</strong>: badbadpassword
          </p>
          <p className="demoUserCredentials">* both Username and Password are case-sensitive</p>
        </header>
        <section>
          {this.state.error && <div className="errorMsg">{this.state.error}</div>}
          <form className="signInForm" onSubmit={this.onSignIn}>
            <label htmlFor="signin_user_name">Username</label>
            <input
              type="text"
              name="user_name"
              id="signin_user_name"
              onChange={(e) => this.handleUsernameChange(e.target.value)}
            />
            {this.state.user_name.touched && (
              <div className="formValidationMsg">{this.usernameValidation()}</div>
            )}
            <label htmlFor="signin_password">Password</label>
            <input
              type="password"
              name="password"
              id="signin_password"
              onChange={(e) => this.handlePasswordChange(e.target.value)}
            />
            {this.state.password.touched && (
              <div className="formValidationMsg">{this.passwordValidation()}</div>
            )}
            <button disabled={this.usernameValidation() || this.passwordValidation()} type="submit">
              Sign In
            </button>
          </form>
        </section>
      </div>
    );
  }
}
