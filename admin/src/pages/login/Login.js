import React, { useEffect, useState } from 'react'
import { Grid, CircularProgress, Typography, Button, Tabs, Tab, TextField } from '@material-ui/core'
import { withRouter ,useHistory} from 'react-router-dom'


// import classnames from 'classnames'
// import forgot from '../forgot password/forgot'

// styles
import useStyles from './styles'

// logo
// import google from '../../images/google.svg'
import newbanner from './newbanner.avif'

// context
import { useUserDispatch, loginUser } from '../../context/UserContext'

function Login(props) {
  var classes = useStyles()

  // global
  var userDispatch = useUserDispatch()

  // local
  var [isLoading, setIsLoading] = useState(false)
  var [error, setError] = useState(null)
  var [activeTabId, setActiveTabId] = useState(0)
  var [nameValue, setNameValue] = useState('')
  var [loginValue, setLoginValue] = useState('')
  var [passwordValue, setPasswordValue] = useState('')

  const history = useHistory()
  const forgotPage = () => {
    history.push('/forgot')
  }

  useEffect(() => {
    if (error == true) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [error])
  const nsssssssss = () => {
    loginUser(userDispatch, loginValue, passwordValue, props?.history, setIsLoading, setError)
  }
  console.log('errorerrorerrorerror', error)
  const [isValid, setIsValid] = useState(false)
  const [message, setMessage] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [errormessage, setErrorMessage] = useState('')

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const validateEmail = (event) => {
    const email = event.target.value
    setLoginValue(email)
    if (emailRegex.test(email)) {
      setIsValid(true)
      setMessage(null)
    } else {
      setIsValid(false)
      setMessage('Please enter a valid email!')
    }
  }
  const emailValidation = (event) => {
    const newuseremail = event.target.value
    setLoginValue(newuseremail)
    if (emailRegex.test(newuseremail)) {
      setEmailValid(true)
      setErrorMessage(null)
    } else {
      setEmailValid(false)
      setErrorMessage('Please enter a valid email!')
    }
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={newbanner} alt="newbanner" className={classes.imagetypeContainer} />
        {/* <Typography className={classes.logotypeText}>
          Material Admin
          </Typography> */}
      </div>
      
      <Grid  className={classes.container1}>
      <div className={classes.formContainer}>
        {error == true ? (
          <Typography color="secondary" className={classes.errorMessage}>
            Your credentials are not matched!!
          </Typography>
        ) : null}
        <div className={classes.form}>
          {/* <Tabs value={activeTabId} onChange={(e, id) => setActiveTabId(id)} indicatorColor="primary" textColor="primary" centered> */}
          <Tabs centered>
            <Tab label="Login" classes={{ root: classes.tab }} />
            {/* <Tab label="New User" classes={{ root: classes.tab }} /> */}
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                value={loginValue}
                // onChange={e => setLoginValue(e.target.value)}
                onChange={validateEmail}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                
                variant="outlined"
              />
              <div className={`message ${isValid ? 'success' : 'error'}`}>{message}</div>
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                variant="outlined"
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      // loginValue.length === 0 || passwordValue.length === 0
                      !isValid || passwordValue.length === 0
                    }
                    onClick={() => nsssssssss()}
                    variant="contained"
                    color="primary"
                    size="large">
                    Login
                  </Button>
                )}
                <Button color="primary" size="large" className={classes.forgotButton} onClick={forgotPage}>
                  Forgot Password
                </Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              {/* <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography> */}
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              {/* <alpha in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </alpha> */}
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                 variant="outlined"
              />
              <TextField
                id="newuseremail"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                value={loginValue}
                onChange={emailValidation}
                // onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="newuseremail"
                variant="outlined"
              />
              <div className={`errormessage ${emailValid ? 'success' : 'error'}`}>{errormessage}</div>
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                variant="outlined"
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() => loginUser(userDispatch, loginValue, passwordValue, props?.history, setIsLoading, setError)}
                    disabled={!emailValid || passwordValue.length === 0 || nameValue.length === 0}
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}>
                    Create your account
                  </Button>
                )}
              </div>
              {/* <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div> */}
              {/* <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button> */}
            </React.Fragment>
          )}
        </div>
        {/* <Typography color="primary" className={classes.copyright}>
        © 2014-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic</a>, LLC. All rights reserved.
        </Typography> */}
      </div>
      </Grid>
    </Grid>
  )
}

export default withRouter(Login)
