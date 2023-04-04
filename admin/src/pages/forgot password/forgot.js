import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
    Button,
  Tabs,
  Tab,
  TextField,
  Typography,
} from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";
import axios from "axios";


// styles
import useStyles from "./styles";

import newbanner from '../login/newbanner.avif'

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { toast } from "react-toastify";

const ForgotPassword = (props) => {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [email, setEmail] = useState("");
  var [message, setMessage] = useState("");
  const history = useHistory();
  // const passForget  = ()=>{

  //   history.push("/ForgotPassword");
  // }
  const Backbtn  = ()=>{

    history.push("/login");
  }


  const setValue = (e) => {
    setEmail(e.target.value)
    setMessage(false)
  }
  const sendLink = async (e) => {    
    // const axios =  require('axios');
    let data = JSON.stringify({
      email: email
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://103.120.178.54:3010/auth/forgot-password',
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

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={newbanner} alt="newbanner" className={classes.imagetypeContainer} />
        
      </div>
      <Grid className={classes.container1}>



        <div className={classes.formContainer}>
          <div className={classes.form}>


        {message ? <Typography color="primary" className={classes.errorMessage}>
            {message}
          </Typography>:""}

            <Tabs centered
            >
              <Tab label="Forgot Password" classes={{ root: classes.tab }} />
              {/* <Tab label="New User" classes={{ root: classes.tab }} /> */}
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment>
                <TextField
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={email}
                  onChange={setValue}
                  margin="normal"
                  placeholder="Email Adress"
                  type="email"
                  variant="outlined"
                />
                
                <div className={classes.formButtons1}>
                  <Button
                    onClick={() =>
                      Backbtn()
                    }
                    variant="contained"
                    color="primary"
                    size="large"

                  >
                    Back
                  </Button>
                  {isLoading ? (
                    <CircularProgress size={26} className={classes.loginLoader} />
                  ) : (
                    <Button
                      disabled={
                        email.length === 0
                      }
                      onClick={() =>
                        sendLink()
                      }

                      variant="contained"
                      color="primary"
                      size="large"

                    >
                      Reset password Link
                    </Button>
                  )}
                  {/* <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forget Password
                </Button> */}
                </div>
              </React.Fragment>
            )}
            {/* {activeTabId === 1 && (
            <React.Fragment> */}
            {/* <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={email}
                onChange={e => setemail(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              /> */}
            {/* <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        email,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      email.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div> */}
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
            {/* </React.Fragment>
          )} */}
          </div>
          {/* <Typography color="primary" className={classes.copyright}>
        © 2014-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic</a>, LLC. All rights reserved.
        </Typography> */}
        </div>
      </Grid>
    </Grid>

  );
}

export default withRouter(ForgotPassword);
