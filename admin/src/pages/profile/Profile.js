import React, { useState, useEffect } from "react";

import {
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
  Tab,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import useStyles from "./styles";
import { updateProfile, getProfile } from "../../context/UserContext";
import {
  AccountCircle,
  AccountCircleOutlined,
  AccountCircleRounded,
  EmailOutlined,
  EmailRounded,
} from "@material-ui/icons";

function Profile(props) {
  var classes = useStyles();
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const [full_name, setFull_name] = useState("");
  const [user_photo, setUserphoto] = useState();
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getProfile(setCurrentUserDetails, setFull_name);
  }, []);

  const handleProfile = () => {
    let value = JSON.stringify({
      full_name: full_name,
      _id: currentUserDetails._id,
      user_photo: user_photo,
    });
    updateProfile(value, setSuccess);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("Called", reader);
        baseURL = reader.result;

        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (e) => {
    let file = e.target.files[0];
    getBase64(file).then((result) => {
      file["base64"] = result;
      setUserphoto(result);
    });
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        {currentUserDetails ? (
          <>
            <React.Fragment>
              <Typography className={classes.succesMessage}>
                {success}
              </Typography>
              <Tab label="Profile" />

              {!user_photo ? (
                <>
                  <img
                    alt="img"
                    className={classes.image}
                    src={currentUserDetails.user_photo}
                  />
                </>
              ) : (
                <>
                  <img alt="img" className={classes.image} src={user_photo} />
                </>
              )}
              <Button component="label">
                Upload Profile
                <input onChange={handleFileInputChange} type="file" hidden />
              </Button>
              <form>
                <TextField
                  id=" Email"
                  margin="normal"
                  placeholder=" Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  disabled
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRounded />
                      </InputAdornment>
                    ),
                  }}
                  value={currentUserDetails.email}
                />
                <TextField
                  id="Name"
                  margin="normal"
                  placeholder="Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleRounded />
                      </InputAdornment>
                    ),
                  }}
                  defaultValue={currentUserDetails.full_name}
                  onChange={(e) => setFull_name(e.target.value)}
                />
              </form>
              <div>
                <div className={classes.creatingButtonContainer}>
                  <Button
                    margin="normal"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleProfile}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </React.Fragment>
          </>
        ) : (
          <>
            {" "}
            <Box className={classes.loginLoaders}>
              <CircularProgress size={46} />
            </Box>
          </>
        )}
      </div>
    </Grid>
  );
}
export default Profile;
