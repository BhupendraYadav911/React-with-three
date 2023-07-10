import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Tab,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@material-ui/core";

import { changePassword, getProfile } from "../../context/UserContext";
// styles

import useStyles from "./styles";
import {
  EmailRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@material-ui/icons";
function ChangePassword(props) {
  const [success, setSuccess] = useState("");
  const [isTrue, setIsTrue] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [input, setTextField] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  var classes = useStyles();
  const value = {
    oldPass: input.currentPassword,
    newPass: input.newPassword,
  };

  function handleSubmit(e) {
    e.preventDefault();
    changePassword(value, setSuccess, setIsTrue, setMessage, setIsLoading);
  }

  const onTextFieldChange = (e) => {
    const { name, value } = e.target;
    setTextField((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateTextField(e);
  };

  const validateTextField = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      return stateObj;
    });
  };
  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <React.Fragment>
          <Tab label="Change Password" classes={{ root: classes.tab }} />

          <Typography className={classes.succesMessage}>{message}</Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              id="Current Password"
              InputProps={{
                disableUnderline: true,
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <VisibilityRounded />
                  </InputAdornment>
                ),
              }}
              margin="normal"
              placeholder="Current Password"
              type="password"
              variant="outlined"
              name="currentPassword"
              fullWidth
              value={input.currentPassword}
              onChange={onTextFieldChange}
              onBlur={validateTextField}
            />
            {error.currentPassword && (
              <Typography className={classes.err}>
                {error.currentPassword}
              </Typography>
            )}
            <TextField
              id="New Password"
              InputProps={{
                disableUnderline: true,
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <VisibilityRounded />
                  </InputAdornment>
                ),
              }}
              margin="normal"
              placeholder="New Password"
              type="password"
              variant="outlined"
              name="newPassword"
              fullWidth
              value={input.newPassword}
              onChange={onTextFieldChange}
              onBlur={validateTextField}
            />
            {error.newPassword && (
              <Typography className={classes.err}>
                {error.newPassword}
              </Typography>
            )}
            <TextField
              id="Confirm Password"
              InputProps={{
                disableUnderline: true,
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <VisibilityRounded />
                  </InputAdornment>
                ),
              }}
              margin="normal"
              placeholder="Confirm Password"
              type="password"
              variant="outlined"
              name="confirmPassword"
              fullWidth
              value={input.confirmPassword}
              onChange={onTextFieldChange}
              onBlur={validateTextField}
            />
            {error.confirmPassword && (
              <Typography className={classes.err}>
                {error.confirmPassword}
              </Typography>
            )}
            <div>
              <div className={classes.creatingButtonContainer}>
                <Button
                  disabled={
                    input.newPassword != input.confirmPassword ||
                    !input.currentPassword ||
                    !input.newPassword ||
                    !input.confirmPassword
                  }
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  Change Password
                </Button>
              </div>
            </div>
          </form>
        </React.Fragment>
      </div>
    </Grid>
  );
}
export default ChangePassword;
