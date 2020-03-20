import React from 'react';
import './SignUp.css';

function SignUp() {
  return (
    <main role='main' className='signUp'>
    <header>
      <h1>Sign Up</h1>
    </header>
    <section>
      <form>
        <label htmlFor='register_user_name'>Username</label>
        <input type='text' name='user_name' id='register_user_name' />
        <label htmlFor='register_password'>Password</label>
        <input type='password' name='password' id='register_password' />
        <label htmlFor='register_full_name'>Full Name</label>
        <input type='text' name='full_name' id='register_full_name' />
        <input type='submit' />
      </form>
    </section>
  </main>
  )
}

export default SignUp;