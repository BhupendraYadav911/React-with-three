import React from 'react'
import axios from 'axios'

var UserStateContext = React.createContext()
var UserDispatchContext = React.createContext()
var baseURL = "http://103.120.178.54:3010";
function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true }
    case 'LOGIN_FAILURE':
      return { ...state, isAuthenticated: false }
    case 'SIGN_OUT_SUCCESS':
      return { ...state, isAuthenticated: false }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem('token')
  })

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

function useUserState() {
  var context = React.useContext(UserStateContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }
  return context
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUserState, useUserDispatch, loginUser, forgetPass, resetPassUser, signOut, currentUser }

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false)
  setIsLoading(true)
  console.log(dispatch, login, password, history, setIsLoading, setError);
  if (!!login && !!password) {
    setTimeout(() => {

      let data = JSON.stringify({
        email: login,
        password: password
      })

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: baseURL + '/auth/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }

      axios(config)
        .then((response) => {
          console.log('user-Info', response.data);
          localStorage.setItem('token', response.data.token)
          setError(null)
          setIsLoading(false)
          dispatch({ type: 'LOGIN_SUCCESS' })

          history.push('/app/dashboard')
        })
        .catch((error) => {
          console.log(error)
          setError(true)
          setIsLoading(false)
          // dispatch({ type: 'LOGIN_FAILURE' })
        })


    }, 2000)
  } else {
    dispatch({ type: 'LOGIN_FAILURE' })
    setError(true)
    setIsLoading(false)
  }
}
function forgetPass(emailValue) {

  let data = JSON.stringify({
    email: emailValue,

  })

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: baseURL + '/auth/forgot-password',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  axios(config)
    .then((response) => {
      console.log('aaaaaaaaaaaaaa', response);
      if (response.data.code == 200) {
        console.log('if', response);
        alert(response.data.message);
      } else {
        console.log('else', response);
      }
    })
    .catch((error) => {
      console.log(error)
      // dispatch({ type: 'LOGIN_FAILURE' })
    })
}
function resetPassUser(dispatch, resetToken, passwordValue, passwordConfirmValue, history, setIsLoading, setError) {
  setError(false)
  setIsLoading(true)
  let data = JSON.stringify({
    resetToken: resetToken,
    newPassword: passwordValue,
    confirmPassword: passwordConfirmValue
  })

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: baseURL + '/auth/reset-password',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  axios(config)
    .then((response) => {
      if (response.data.code == 200) {
        setError(null)
        setIsLoading(false)
        console.log('if', response);
        alert(response.data.message);
        history.push('/login')
      } else {
        console.log('else', response);
      }
    })
    .catch((error) => {
      console.log(error)
      setError(true)
      setIsLoading(false)
      // dispatch({ type: 'LOGIN_FAILURE' })
    })
}
function signOut(dispatch, history) {
  localStorage.removeItem('token')
  dispatch({ type: 'SIGN_OUT_SUCCESS' })
  history.push('/login')
}

function currentUser() {

  // const token = localStorage.getItem('token');
  // let config = {
  //   method: 'get',
  //   maxBodyLength: Infinity,
  //   url: baseURL + '/auth/current-user',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   },
  //   data: {}
  // }

  // axios(config)
  //   .then((response) => {
  //     if (response.data.code == 200) {
  //       console.log('if', response.data.data);
  //       return response.data.data;
  //     } else {
  //       console.log('else', response);
  //       return response.data.data;
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error)

  //     // dispatch({ type: 'LOGIN_FAILURE' })
  //   })
}