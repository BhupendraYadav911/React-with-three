import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
import newbanner from "../login/newbanner.avif";

// context
import {
  useUserDispatch,
  loginUser,
  resetPassUser,
} from "../../context/UserContext";

function ResetPassword(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [iserror, setIsError] = useState("");
  const [activeTabId, setActiveTabId] = useState(0);
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmpasswordValue, setConfirmPasswordValue] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState(null);

  const classes = useStyles();
  const userDispatch = useUserDispatch();

  const checkValidation = (e) => {
    setConfirmPasswordValue(e.target.value);
    if (passwordValue != e.target.value) {
      console.log("paas", passwordValue, "mat", confirmpasswordValue);
      setError("Your credentials are not matched!!");
    } else {
      setError("");
    }
  };

  const setValue = (e) => {
    setPasswordValue(e.target.value);
    setMessage(false);
  };
  const setValue1 = (e) => {
    setConfirmPasswordValue(e.target.value);
    setMessage(false);
  };
  const ResetPasswords = async (e) => {
    resetPassUser(
      passwordValue,
      confirmpasswordValue,
      setIsLoading,
      setMessage,
      setError,
      history
    );
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
              <Tab label="Reset Password" classes={{ root: classes.tab }} />
            </Tabs>
            
  <Typography className={classes.errorMessage}>
          {error}
          </Typography>
          <Typography className={classes.succesMessage}>
          {message}
          </Typography>
            {activeTabId === 0 && (
              <React.Fragment>
                <TextField
                  placeholder="New Password"
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={passwordValue}
                  onChange={setValue}
                  margin="normal"
                  type="password"
                  variant="outlined"
                />

                <TextField
                  id="confirmpassword"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={confirmpasswordValue}
                  onChange={(e) => checkValidation(e)}
                  margin="normal"
                  placeholder="Confirm Password"
                  type="password"
                  variant="outlined"
                />

                <div className={classes.formButtons1}>
                  {isLoading ? (
                    <CircularProgress
                      size={26}
                      className={classes.loginLoader}
                    />
                  ) : (
                    <Button
                      disabled={
                        passwordValue != confirmpasswordValue ||
                        (!passwordValue && !confirmpasswordValue)
                        // confirmpasswordValue.length === 0 || passwordValue.length === 0
                      }
                      // onClick={() =>
                      //   loginUser(
                      //     userDispatch,
                      //     passwordValue,
                      //     confirmpasswordValue,
                      //     props.history,
                      //     setIsLoading,
                      //     // setIsError
                      //     setError
                      //   )
                      // }
                      onClick={ResetPasswords}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Reset Password
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(ResetPassword);