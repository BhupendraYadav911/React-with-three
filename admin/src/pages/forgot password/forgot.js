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

import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, forgetPass } from "../../context/UserContext";

function ForgetPassword(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  // var [activeTabId, setActiveTabId] = useState(0);
  // var [nameValue, setNameValue] = useState("");
   var [emailValue, setEmailValue] = useState("");
  // var [passwordValue, setPasswordValue] = useState("password");

  const history = useHistory();
  const passForget = () => {

   // history.push("/resetpassword");
   forgetPass(emailValue);
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
       
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={emailValue}
              onChange={e => setEmailValue(e.target.value)}
              margin="normal"
              placeholder="Email Adress"
              type="email"
              fullWidth
            />

            <div className={classes.formButtons1}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  disabled={
                    emailValue.length === 0
                  }
                  onClick={() =>
                    passForget()
                  }
                  variant="contained"
                  color="primary"
                  size="large"

                >
                  Request password reset link
                </Button>
              )}
            </div>
          </React.Fragment>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(ForgetPassword);
