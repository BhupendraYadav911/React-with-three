import React, { useState } from "react";
import {
 message,
 Alert
} from 'antd';
import { Grid, Button, Tab, TextField } from "@material-ui/core";
import classNames from "classnames";
import { useHistory ,useParams} from "react-router-dom";
import { useUserDispatch, updateBanner,changePassword } from '../../context/UserContext'
// styles

import useStyles from "./styles";
function ChangePassword(props) {
  const[success,setSuccess]=useState('')
  const[isTrue,setIsTrue]=useState(false)
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
    const id = useParams();
    var value = JSON.stringify({
        _id:id,
        oldPassword:input.currentPassword,
        newPassword:input.newPassword
      })

  function handleSubmit(e) {
    e.preventDefault();
    changePassword(value,setSuccess,setIsTrue)

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

      switch (name) {
        case "currentPassword":
          if (!value) {
            stateObj[name] = "Please enter Current Password.";
          }
          break;

        case "newPassword":
          if (!value) {
            stateObj[name] = "Please enter New Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "New Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.newPassword && value !== input.newPassword) {
            stateObj[name] = "NewPassword and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <React.Fragment>
          <Tab label="Change Password" classes={{ root: classes.tab }} />
         {success && (
                <Alert
                  message={success.message}
                  type="success"
                />
              )}
          <form onSubmit={handleSubmit}>
            <TextField
              id="Current Password"
              InputProps={{
                disableUnderline: true,
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              margin="normal"
              placeholder="Current Password"
              type="password"
              variant="outlined"
              name="currentPassword"
              value={input.currentPassword}
              onChange={onTextFieldChange}
              onBlur={validateTextField}
            />
            {error.currentPassword && (
              <span className="err">{error.currentPassword}</span>
            )}
            <TextField
              id="New Password"
              InputProps={{
                disableUnderline: true,
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              margin="normal"
              placeholder="New Password"
              type="password"
              variant="outlined"
              name="newPassword"
              value={input.newPassword}
              onChange={onTextFieldChange}
              onBlur={validateTextField}
            />
            {error.newPassword && (
              <span className="err">{error.newPassword}</span>
            )}
            <TextField
              id="Confirm Password"
              InputProps={{
                disableUnderline: true,
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              margin="normal"
              placeholder="Confirm Password"
              type="password"
              variant="outlined"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={onTextFieldChange}
              onBlur={validateTextField}
            />
            {error.confirmPassword && (
              <span className="err">{error.confirmPassword}</span>
            )}
            <div>
              <div className={classes.creatingButtonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit">
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
