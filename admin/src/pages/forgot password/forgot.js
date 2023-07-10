import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
    Button,
  Tabs,
  Tab,
  TextField,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";
import axios from "axios";


// styles
import useStyles from "./styles";

import newbanner from '../login/newbanner.avif'

// context
import { useUserDispatch, loginUser,forgotPassword } from "../../context/UserContext";
import { toast } from "react-toastify";
import { EmailRounded } from "@material-ui/icons";

const ForgotPassword = (props) => {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);
  // const [message, setMessage] = useState("");


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

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const validateEmail = (event) => {
    const email = event.target.value;
    // setLoginValue(email);
    setEmail(email)
    if (emailRegex.test(email)) {
      setIsValid(true);
      setMessage(null);
    } else {
      setIsValid(false);
      setMessage("Please enter a valid email!");
    }
  };


  // const setValue = (e) => {
  //   setEmail(e.target.value)
  //   setMessage(false)
  // }
  const sendLink = async (e) => {    
    forgotPassword(email,setMessage,setEmail)
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={newbanner} alt="newbanner" className={classes.imagetypeContainer} />
        
      </div>
      <Grid className={classes.container1}>



        <div className={classes.formContainer}>
          <div className={classes.form}>


        {/* {message ? <Typography color="primary" className={classes.errorMessage}>
            {message}
          </Typography>:""} */}
          <Typography className={classes.errorMessage}>
          {error}
          </Typography>
          <Typography className={classes.succesMessage}>
          {message}
          </Typography>

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
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRounded />
                      </InputAdornment>
                    ),
                  }}
                  value={email}
                  fullWidth
                  // onChange={setValue}
                  onChange={validateEmail}
                  margin="normal"
                  placeholder="Email Adress"
                  type="email"
                  variant="outlined"
                />
                 {/* <div className={`message ${isValid ? "success" : "error"}`}>
                  {message}
                </div> */}
                
                <div className={classes.formButtons}>
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

                      // variant="contained"
                      color="primary"
                      size="large"

                    >
                      Reset password 
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
           
          </div>
       
        </div>
      </Grid>
    </Grid>

  );
}

export default withRouter(ForgotPassword);
