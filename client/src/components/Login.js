import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ credentials, setCredentials ] = useState({ username: '', password: ''})

  const handleChange = event => {
    setCredentials(
      {
        ...credentials,
        [event.target.name]: event.target.value
      }
    )
  }
  const onSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
    .post('/api/login', credentials)
    .then(response => {
      console.log("Post Response", response)
      localStorage.setItem('token', response.data.payload)
      //PUSH TO BUBBLE PAGE WITH TOKEN right now '/' so find it
      props.history.push("/bubbles")
    })
    .catch(error => {
      console.log(error)
      setCredentials({username: "", password: ""})
    })
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <div>
        {/* onSubmit={onSubmit} goes in top form tag when ready */}
            <form onSubmit={onSubmit}>
                <div>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="User Name"
                    value={credentials.username}
                    onChange={handleChange}
                />
                </div>
                <div>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                />
                </div>
                <button>Login</button>
            </form>
        </div>
    </>
  );
};

export default Login;
