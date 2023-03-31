import React from "react";

import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
} from "@material-ui/core";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
// styles
// styles
// styles
import useStyles from "./styles";
function ChangePassword(props) {
  var classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <React.Fragment>
          <Tab label="Change Password" classes={{ root: classes.tab }} />
          <TextField
            id="Current Password"
            style={{ width: 400, border: " 1px solid ", borderRadius: "4px" }}
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
          />
          <TextField
            id="New Password"
            style={{ width: 400, border: " 1px solid ", borderRadius: "4px" }}
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
          />
          <TextField
            id="Confirm Password"
            style={{ width: 400, border: " 1px solid ", borderRadius: "4px" }}
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
          />
          <div>
            <div className={classes.creatingButtonContainer}>
              <Button variant="contained" color="primary" size="large">
                Change Password
              </Button>
            </div>
          </div>
        </React.Fragment>
      </div>
    </Grid>
  );
}
export default ChangePassword;
