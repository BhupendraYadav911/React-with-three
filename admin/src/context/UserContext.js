import React from 'react'
import axios from 'axios'
import {
 message
} from 'antd';
 const access_token = localStorage.getItem('token')
var UserStateContext = React.createContext()
var UserDispatchContext = React.createContext()
var baseURL = process.env.REACT_APP_API_URL;
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

export { UserProvider, useUserState, useUserDispatch, loginUser, forgetPass, resetPassUser, signOut, currentUser,updateBanner ,getBanner,changePassword,updateProfile,getProfile,forgotPassword}

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
// function resetPassUser(dispatch, passwordValue, passwordConfirmValue, history, setIsLoading, setError,setMessage,setRrrr) {
//  // setError(false)
//   //setIsLoading(true)
//   const a = window.location.href;
//   const b = "http://localhost:3011/#/resetpassword/token="
//   const isToken = a.substring(b.length)
//   let data = JSON.stringify({
//     resetToken: isToken,
//     newPassword: passwordValue,
//     confirmPassword: passwordConfirmValue
//   })

//   let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: baseURL + '/auth/reset-password',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: data
//   }

//   axios(config)
//     .then((response) => {
//       if (response.data.code == 200) {
//         console.log('if', response);
//         console.log(response.data.message)
//         return response;
//       } else {
//         console.log('else', response);
//       }
//     })
//     .catch((error) => {
//       console.log(error)
//       setError(true)
//       setIsLoading(false)
//       // dispatch({ type: 'LOGIN_FAILURE' })
//     })
// }

function resetPassUser(
  passwordValue,
  confirmpasswordValue,
  setIsLoading,
  setMessage,
  setError,
  history
) {
  const a = window.location.href;
  const b = "http://localhost:3011/#/resetpassword/token=";
  const isToken = a.substring(b.length);
  let data = JSON.stringify({
    resetToken: isToken,
    newPassword: passwordValue,
    confirmPassword: confirmpasswordValue,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://103.120.178.54:3010/auth/reset-password",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      if (response.data.code == 200) {
        setError(null);
        setIsLoading(false);
        setMessage(response.data.message);
        // console.log('if', response);
        // alert(response.data.message);
        setTimeout(()=>{
        history.push("/login")}
        ,10000);
      } else {
        console.log("else", response);
        setError(response.data.message)
      }
    })
    .catch((error) => {
      console.log(error);
      setError(true);
      setIsLoading(false);
      // dispatch({ type: 'LOGIN_FAILURE' })
    });
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



function getBanner(setIsLoading, setData){
  setIsLoading(true);
 const token = localStorage.getItem('token');
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: baseURL + '/setting/banner',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  axios(config)
      .then((response) => {
     console.log(response.data.data)
     setData(response.data.data)
     setIsLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false);
  
        // dispatch({ type: 'LOGIN_FAILURE' })
      })
}


function updateBanner(value,setIsModalOpen,setSuccess,ref,setRef){
 const token = localStorage.getItem('token');
    let config = {
      method: 'PUT',
      maxBodyLength: Infinity,
      url: baseURL + '/setting/upadte-banner',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data:value
    }
  axios(config)
      .then((response) => {
      //  getBanner(setData);
      setSuccess({message: response.data.message});
      setTimeout(()=>{
        setIsModalOpen(false)
        setRef(!ref);
    },2000)
      })
      .catch((error) => {
        console.log(error)
  
        // dispatch({ type: 'LOGIN_FAILURE' })
      })
  
}

function changePassword(value,setSuccess,setIsTrue,setIsLoading,setMessage,setErrors){
  var data = JSON.stringify({
      oldPassword:value.oldPass,
      newPassword:value.newPass
    })
  console.log(data)
  const token = localStorage.getItem('token');
  let config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: baseURL + '/auth/change-password',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  }

  axios(config)
    .then((response) => {

      if (response.data.code == 200) {
        setIsTrue(true)
        // setError(null);
        setIsLoading(false);
        setMessage(response.data.message);
        // console.log('if', response);
        // alert(response.data.message);
        // setTimeout(()=>{
        // history.push("/login")}
        // ,10000);
      } else {
        console.log("else", response);
        setMessage(response.data.response)
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
      // setError(true);
      // setIsLoading(false);
      // dispatch({ type: 'LOGIN_FAILURE' })
    });
}


     
 // setSuccess({
 //            message: 'password change successfully',
 //          });
      
    
//     .catch((error) => {
//       console.log(error)
//       setErrors(response.response);

//       // dispatch({ type: 'LOGIN_FAILURE' })
//     })
// }

function updateProfile(value,setSuccess){
  const token = localStorage.getItem('token');
    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: baseURL + '/auth/update-user-profile',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data:value
    }
  axios(config)
      .then((response) => {
        if (response.data.code == 200) {
           setSuccess({
              message: 'Profile update successfully',
            });
          console.log('if', response.data.data);
          // setCurrentUserDetails(response.data.data)
          // setFull_name(response.data.data.full_name)
        } else {
          console.log('else', response);
          
        }
      })
      .catch((error) => {
        console.log(error)
  
        // dispatch({ type: 'LOGIN_FAILURE' })
      })
}

function getProfile(setCurrentUserDetails,setFull_name){
  // setIsLoading(true);
  const token = localStorage.getItem('token');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/auth/current-user',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {}
    }
  
    axios(config)
      .then((response) => {

        if (response.data.code == 200) {
          // setIsLoading(false);

          console.log('if', response.data.data);
          setCurrentUserDetails(response.data.data)
          setFull_name(response.data.data.full_name)
          
        } else {
          console.log('else', response);
          // setIsLoading(false);
          
        }
      })
      .catch((error) => {
        console.log(error)
        // setIsLoading(false);
  
        // dispatch({ type: 'LOGIN_FAILURE' })
      })
}

function forgotPassword(email,setMessage,setEmail){
    let data = JSON.stringify({
      email: email
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3010/auth/forgot-password',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setEmail("");
      setMessage('Password Reset Link Send Successfully')
    })
    .catch((error) => {
      console.log(error);
      setEmail("");
      setMessage('Enter Registered Email Id')
    });
}