import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
import newbanner from "./newbanner.avif";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { EmailRounded, Lock as ChangepasswordIcon } from "@material-ui/icons";

function Login(props) {
  const classes = useStyles();

  // global
  const userDispatch = useUserDispatch();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);
  const [nameValue, setNameValue] = useState("");
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const history = useHistory();
  const forgotPage = () => {
    history.push("/forgot");
  };

  useEffect(() => {
    if (error == true) {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [error]);
  const loginPage = () => {
    loginUser(
      userDispatch,
      loginValue,
      passwordValue,
      props?.history,
      setIsLoading,
      setError
    );
  };
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [errormessage, setErrorMessage] = useState("");

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const validateEmail = (event) => {
    const email = event.target.value;
    setLoginValue(email);
    if (emailRegex.test(email)) {
      setIsValid(true);
      setMessage(null);
    } else {
      setIsValid(false);
      setMessage("Please enter a valid email!");
    }
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img
          src={newbanner}
          alt="newbanner"
          className={classes.imagetypeContainer}
        />
      </div>

      <Grid className={classes.container1}>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Tabs centered>
              <Tab label="Login" classes={{ root: classes.tab }} />
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
                  value={loginValue}
                  fullWidth
                  onChange={validateEmail}
                  margin="normal"
                  placeholder="Email Address"
                  type="email"
                  variant="outlined"
                  
                />
                <div className={`message ${isValid ? "success" : "error"}`}>
                  {message}
                </div>
                <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <ChangepasswordIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={passwordValue}
                  fullWidth
                  onChange={(e) => setPasswordValue(e.target.value)}
                  margin="normal"
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  
                />
                <div className={classes.formButtons}>
                  {isLoading ? (
                    <CircularProgress
                      size={26}
                      className={classes.loginLoader}
                    />
                  ) : (
                    <Button
                      disabled={!isValid || passwordValue.length === 0}
                      onClick={() => loginPage()}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Login
                    </Button>
                  )}
                  <Button
                    color="primary"
                    size="large"
                    className={classes.forgotButton}
                    onClick={forgotPage}
                  >
                    Forgot Password
                  </Button>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(Login);
