import { useState,useRef } from 'react';
import classes from './auth-form.module.css';

async function createUser(email, password) {
  console.log("response")
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({email,password}),
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await response.json();

  if(!response.ok){
    throw new Error(data.message || "some thing wrong happened")
  }

  return data
}

function AuthForm() {
  const emailInputRef = new useRef()
  const passwordInputRef = new useRef()

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    

    const enteredEmail = emailInputRef.current.value
    const enteredPasword = passwordInputRef.current.value

    //validation error
    

    if (isLogin) {
    } else {


      try{
        const result = await createUser(enteredEmail, enteredPasword)
        console.log('Successs created user', result)
      }catch(error){
        console.log('Failed to create user',error)
        return;
      }
      
    }
    // Send form data to server
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;