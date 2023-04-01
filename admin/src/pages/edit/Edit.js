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
            id="Banner Name"
            margin="normal"
            placeholder=" Banner Name"
            type="text"
            InputProps={{ disableUnderline: true }}
            style={{ width: 320, border: " 1px solid", borderRadius: '4px' }}
          />
          <TextField
            id="Banner type"
            margin="normal"
            placeholder=" Banner type"
            type="text"
            InputProps={{ disableUnderline: true }}
            style={{ width: 320, border: " 1px solid ",borderRadius: '4px' }}
          />
          <TextField
            className={classes.profileMenuIcon}
            id="fileInput"
            margin="normal"
            placeholder="Edit Photo"
            type="file"
            InputProps={{ disableUnderline: true }}
            style={{ width: 320, border: "1px solid" ,borderRadius: '4px'}}
          />
          <div>
            <div className={classes.creatingButtonContainer}>
              <Button
                margin="normal"
                variant="contained"
                color="primary"
                size="large">
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
