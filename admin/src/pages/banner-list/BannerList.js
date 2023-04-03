import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import axios from 'axios'
import {
  Row,
  Col,
  Modal,
  Button,
  Table,
  Select,
  Card,
  Alert,
  Form,
  Checkbox,
  message,
  Input,
  Tooltip,
  Upload
} from 'antd';
import {TextField} from "@material-ui/core"
import { Base64 } from "js-base64";
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useUserDispatch, updateBanner,getBanner } from '../../context/UserContext'
import {
  Grid,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { ColumnProps, PaginationConfig, SorterResult } from 'antd/lib/table';
import useStyles from "./BannerListStyle";
export default function BannerList(props) {
var classes = useStyles();
const [data,setData]=useState();
const [isModalOpen, setIsModalOpen] = useState(false);
const [editedBanner, setEditedBanner] = useState({
  name:"",
  banner_url:""
});
  const [banner_url, setBanner_url] = useState();
  const [name, setName] = useState("");
  const [banner_type, setBanner_type] = useState("");
  const [success,setSuccess]=useState();

useEffect(()=>{
getBanner(setData);
},[0])



const handleOk =()=>{
   let value = JSON.stringify({
        bannerId:editedBanner._id,
        name:name,
        banner_type:banner_type,
        banner_url:banner_url
      })
  updateBanner(value,setIsModalOpen,setSuccess);



// let myPromise = new Promise(function(myResolve, myReject) {
// updateBanner(value,setIsModalOpen,setSuccess)
// });

  // const ress =  updateBanner(value,setIsModalOpen,setSuccess)
  // console.log(ress)
}

 const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        //console.log("File Is", file);
        setBanner_url(result)
})}

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
     
    },
    {
      title: 'Banner type',
      dataIndex: 'banner_type',
      key: 'banner_type',
      width: '20%',
     
    },
    {
      title: 'Banner url',
      dataIndex: 'banner_url',
      key: 'banner_url',
      render: banner_url => <img className={classes.bannerImage} src={banner_url} />
    },
    // {
    //   title: 'CreatedAt',
    //   dataIndex: 'createdAt',
    //   key: 'createdAt',
    //   // defaultSortOrder: 'descend',
    //   // render: (createdAt?: Date) =>
    //   //   createdAt ? moment(createdAt).format('L') : '-',
    //   // sorter: true,
    // },
    {
      key: 'actions',
     title: 'Actions',
      render: (text, banner) => (
        <div className="action-icones">
          <Button
            type="default"
             onClick={() => {
              setEditedBanner(banner);
              setName(banner.name);
              setBanner_type(banner.banner_type);
              setBanner_url(banner.banner_url)
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
<Table columns={columns} dataSource={data} className={classes.bannerTable}/>
<Modal title="Edit Banner" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
 {success && (
                <Alert
                  message={success.message}
                  type="success"
                />
              )}
{editedBanner && (
       <>
<TextField
            id="Banner Name"
            margin="normal"
            placeholder=" Banner Name"
            type="text"
            defaultValue={editedBanner.name} 
            onChange={(e)=>setName(e.target.value)}
            InputProps={{ disableUnderline: true }}
            style={{ width: 320, border: " 1px solid", borderRadius: '4px' }}
          />
          <TextField
            id="Banner type"
            margin="normal"
            placeholder=" Banner type"
            type="text"
            defaultValue={editedBanner.banner_type} 
            onChange={(e)=>setBanner_type(e.target.value)}
            InputProps={{ disableUnderline: true }}
            style={{ width: 320, border: " 1px solid ",borderRadius: '4px' }}
          />
          {`data:image/jpeg;base64,${editedBanner.banner_url}`}
         <input type="file" name="file" onChange={handleFileInputChange} />

       </>)}

</Modal>
</>




    );

}