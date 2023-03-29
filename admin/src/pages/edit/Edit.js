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

function Edit(props) {
  var classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <React.Fragment>
          <Tab label="Edit Banner" />
          <TextField
            id="Edit Name"
            margin="normal"
            placeholder=" Edit Name"
            type="text"
            style={{width:320}}
          />
          <TextField
            id="Edit Banner"
            margin="normal"
            placeholder="Edit Banner"
            type="text"
            style={{width:320}}
          />
          <TextField
            id="Edit photo"
            margin="normal"
            placeholder="Edit Photo"
            type="text"
            style={{width:320}}
          />
          <div>
          <div className={classes.creatingButtonContainer}>
            <Button  margin="normal" variant="contained" color="primary" size="large">
              Edit
            </Button>
            </div>
          </div>
        </React.Fragment>
      </div>
    </Grid>
  );
}
export default Edit;
