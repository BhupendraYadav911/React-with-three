import React,{useState,useEffect} from "react";
import axios from 'axios'
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
} from "@material-ui/core";
import {Alert} from 'antd'
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import { useUserDispatch,updateProfile,getProfile } from '../../context/UserContext'

function Profile(props) {
  var classes = useStyles();
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const [full_name,setFull_name]=useState('')
  const [user_photo,setUserphoto]=useState()
  const [success,setSuccess] = useState('')
console.log(success)
 useEffect(() => {
   getProfile(setCurrentUserDetails,setFull_name)
  }, [])

const handleProfile=()=>{
   let value = JSON.stringify({
        full_name:full_name,
        _id:currentUserDetails._id,
        user_photo:user_photo
      })
  updateProfile(value,setSuccess)
}

const getBase64 = (file) => {
    return new Promise(resolve => {
      let fileInfo;
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

const handleFileInputChange=(e)=>{
  let file = e.target.files[0];
  getBase64(file)
  .then(result => {
        file["base64"] = result;
        setUserphoto(result)
})}


  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        {currentUserDetails && (
      <React.Fragment>
      {success && (
                <Alert
                  message={success.message}
                  type="success"
                />
              )}
          <Tab label="Profile" />
          
          {!user_photo ? <><img className={classes.image} src={currentUserDetails.user_photo}/></>
           : <><img className={classes.image} src={user_photo}/></>}
          <input type="file" name="file" onChange={handleFileInputChange} />
          <TextField
            id=" Email"
            margin="normal"
            placeholder=" Email"
            type="email"
            variant="outlined"
            InputProps={{
              disableUnderline: true,
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={currentUserDetails.email}
          />
          <TextField
            id="Name"
            margin="normal"
            placeholder="Name"
            type="text"
            variant="outlined"
            InputProps={{
              disableUnderline: true,
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            defaultValue={currentUserDetails.full_name}
            onChange={(e)=>setFull_name(e.target.value)}
          />
          <div>
            <div className={classes.creatingButtonContainer}>
              <Button
                margin="normal"
                variant="contained"
                color="primary"
                size="large"
                onClick={handleProfile}>
                Submit
              </Button>
            </div>
          </div>
        </React.Fragment>)}
      </div>
    </Grid>
  );
}
export default Profile;
