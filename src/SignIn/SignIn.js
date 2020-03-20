import React from 'react';
import './SignIn.css';

function SignIn() {
  return (
    <main className='signIn'>
      <header>
        <h2>Sign In</h2>
      </header>
      <section>
      <form>
        <label htmlFor='signin_user_name'>Username</label>
        <input type='text' name='user_name' id='signin_user_name' />
        <label htmlFor='signin_password'>Password</label>
        <input type='password' name='password' id='signin_password' />
        <input type='submit' />
      </form>
    </section>
    </main>
  )
}

export default SignIn;