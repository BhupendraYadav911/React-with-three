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
import { withRouter,useParams } from "react-router-dom";

import classnames from "classnames";

// styles
import useStyles from "./styles";


// context
import { useUserDispatch, resetPassUser } from "../../context/UserContext";

function Resetpassword(props) {
  var classes = useStyles();
  const routeParams = useParams();
  const { token } = routeParams;
  
  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [resetToken, setResetToken] = useState(token.substr(6));
  var [passwordValue, setPasswordValue] = useState("");
  var [passwordConfirmValue, setPasswordConfirmValue] = useState("");
  
  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
            <React.Fragment>
              <label>New Password</label>
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
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                type="password"
                fullWidth
              />

              <label>Confirm Password</label>
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordConfirmValue}
                onChange={(e) => setPasswordConfirmValue(e.target.value)}
                margin="normal"
                placeholder="Confirm Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons1}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      passwordValue.length === 0 || passwordConfirmValue.length === 0
                    }
                    onClick={() =>
                      resetPassUser(
                        userDispatch,
                        resetToken,
                        passwordValue,
                        passwordConfirmValue,
                        props.history,
                        setIsLoading,
                        setError
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large">
                   Reset Password
                  </Button>
                )}
               
              </div>
            </React.Fragment>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Resetpassword);
