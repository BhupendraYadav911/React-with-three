import React from 'react'
import axios from 'axios'

var UserStateContext = React.createContext()
var UserDispatchContext = React.createContext()

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
    isAuthenticated: !!localStorage.getItem('id_token')
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

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut }

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false)
  setIsLoading(true)
// console.log(dispatch, login, password, history, setIsLoading, setError);
  if (!!login && !!password) {
    setTimeout(() => {
     
      let data = JSON.stringify({
        email: login,
        password: password
      })

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://103.120.178.54:3010/auth/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }

      axios(config)
        .then((response) => {
          console.log('user-Info',response.data);
          localStorage.setItem('id_token', response.data.token)
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

function signOut(dispatch, history) {
  localStorage.removeItem('id_token')
  dispatch({ type: 'SIGN_OUT_SUCCESS' })
  history.push('/login')
}