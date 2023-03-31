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

import useStyles from "./styles";

function Profile(props) {
  var classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <React.Fragment>
          <Tab label="Profile" />
          <TextField
            id=" Email"
            margin="normal"
            placeholder=" Email"
            type="email"
            InputProps={{ disableUnderline: true }}
            style={{ width: 320, border: " 1px solid ", borderRadius: "4px" }}
          />
          <TextField
            id="Name"
            margin="normal"
            placeholder="Name"
            type="text"
            InputProps={{ disableUnderline: true }}
            style={{ width: 320, border: " 1px solid ", borderRadius: "4px" }}
          />

          <div>
            <div className={classes.creatingButtonContainer}>
              <Button
                margin="normal"
                variant="contained"
                color="primary"
                size="large">
                Submit
              </Button>
            </div>
          </div>
        </React.Fragment>
      </div>
    </Grid>
  );
}
export default Profile;
