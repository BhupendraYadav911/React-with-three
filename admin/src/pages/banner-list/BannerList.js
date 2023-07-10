import React, { useState, useEffect } from "react";
import {
 
  Modal,
  Button,
  Table,
 
  Alert,
  
} from "antd";
import { Box, CircularProgress, Input, TextField, Typography } from "@material-ui/core";
import {
  useUserDispatch,
  updateBanner,
  getBanner,
} from "../../context/UserContext";

import useStyles from "./BannerListStyle";
export default function BannerList(props) {
  var classes = useStyles();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedBanner, setEditedBanner] = useState({
    name: "",
    banner_url: "",
  });
  const [banner_url, setBanner_url] = useState();
  const [name, setName] = useState("");
  const [banner_type, setBanner_type] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ref, setRef] = useState(false);

  const [success, setSuccess] = useState();

  useEffect(() => {
    
    getBanner(setIsLoading,setData);
    
  }, [ref]);

  const handleOk = () => {
    let value = JSON.stringify({
      bannerId: editedBanner._id,
      name: name,
      banner_type: banner_type,
      banner_url: banner_url,
    });
    updateBanner(value, setIsModalOpen, setSuccess,ref, setRef);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
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

  const handleFileInputChange = (e) => {
    let file = e.target.files[0];
    getBase64(file).then((result) => {
      file["base64"] = result;
      //console.log("File Is", file);
      setBanner_url(result);
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "Banner type",
      dataIndex: "banner_type",
      key: "banner_type",
      width: "20%",
    },
    {
      title: "Banner url",
      dataIndex: "banner_url",
      key: "banner_url",
      render: (banner_url) => (
        <img className={classes.bannerImage} src={banner_url} />
      ),
    },
    
    {
      key: "actions",
      title: "Actions",
      render: (text, banner) => (
        <div className="action-icones">
          <Button
            type="default"
            onClick={() => {
              setEditedBanner(banner);
              setName(banner.name);
              setBanner_type(banner.banner_type);
              setBanner_url(banner.banner_url);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
         </div>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
         <Box className={classes.loginLoaders} >
         <CircularProgress size={46}/>
       </Box>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={data}
            className={classes.bannerTable}
          />

          <Modal
            title="Edit Banner"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {success && <Alert message={success.message} type="success" />}
            {editedBanner && (
              <>
                <TextField
                  id="Banner Name"
                  margin="normal"
                  placeholder=" Banner Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  defaultValue={editedBanner.name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{ disableUnderline: true , 
                    classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },}}
                 
                />
                <TextField
                  id="Banner type"
                  margin="normal"
                  placeholder=" Banner type"
                  type="text"
                  variant="outlined"
                  fullWidth
                  defaultValue={editedBanner.banner_type}
                  onChange={(e) => setBanner_type(e.target.value)}
                  InputProps={{ disableUnderline: true,
                     classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  }, }}
                  
                />
                <Input
                  type="file"
                  name="file"
                  onChange={handleFileInputChange}
                />
              </>
            )}
          </Modal>
        </>
      )}
    </>
  );
}
