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
import { useHistory } from 'react-router-dom'
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
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            margin="normal"
            placeholder="Current Password"
            type="password"
            style={{width:400}}
          />
          <TextField
            id="New Password"
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            margin="normal"
            placeholder="New Password"
            type="password"
            style={{width:400}}
          />
          <TextField
            id="Confirm Password"
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            margin="normal"
            placeholder="Confirm Password"
            type="password"
            style={{width:400}}
          />
          <div>
          <div className={classes.creatingButtonContainer}>
            <Button   variant="contained" color="primary" size="large">
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
