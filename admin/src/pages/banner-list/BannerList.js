
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
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  Grid,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { ColumnProps, PaginationConfig, SorterResult } from 'antd/lib/table';



// const useStyles = makeStyles(theme => ({
//   tableOverflow: {
//     overflow: 'auto'
//   }
// }))
import useStyles from "./BannerListStyle";
export default function BannerList(props) {
var classes = useStyles();
const [data,setData]=useState();
const [editedUser, setEditedUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banner_url, setBanner_url] = useState("");
  const [name, setName] = useState("");
  const [bannerId, setBannerId] = useState();
  //const [banner_type, setBanner_type] = useState("");

console.log(bannerId,'hhhh')
let value = JSON.stringify({
bannerId,
        name,
banner_url
//banner_type
      })
// const value = {
//   name:banner_name,
// banner_url:image,
// banner_type}

const access_token = localStorage.getItem('token')

useEffect(()=>{
fetch('http://localhost:3010/setting/banner')
    .then(response => response.json())
      .then(json => setData(json.data))

},[0])

 const handleOk = () => {
    setIsModalOpen(false);
 var authAuthorization =
        'Bearer ' +
        `${access_token}`;



fetch("http://localhost:3010/setting/upadte-banner", {
  method: "PUT",
    headers: {
          Authorization: authAuthorization,
          'Content-Type': 'application/json',
        },
  body: value,
})
  .then((response) => response.json())
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

  
  const handleCancel = () => {
    setIsModalOpen(false);
  };



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
      render: banner_url => <img className={classes.bannerImage} src={`data:image/jpeg;base64,${banner_url}`} />
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
      render: (text, user) => (
        <div className="action-icones">
          <Button
            type="default"
             onClick={() => {
              setEditedUser(user);
            //   setUserModalVisible(true);
            setIsModalOpen(true);
             }}
          >
            Edit
          </Button>
          
        </div>
      ),
    },
  ];

 const onChange = (imageList, addUpdateIndex) => {
    setBanner_url(imageList.file.originFileObj.name);
  };

  return (
    <>
    <Table columns={columns} dataSource={data} />
     <Modal title="Edit Banner" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     <div className='yyyy'>
    {editedUser && (
       <>
<input type='text' value={editedUser._id} onChange={()=>setBannerId(editedUser._id)}/>
       <TextField
            id="Banner Name"
            margin="normal"
            placeholder=" Banner Name"
            type="text"
            value={editedUser.name} onChange={(e)=>setName(e.target.value)}
            InputProps={{ disableUnderline: true }}
            style={{ width: 320, border: " 1px solid", borderRadius: '4px' }}
          />
           <TextField
            id="Banner type"
            margin="normal"
            placeholder=" Banner type"
            type="text"
            defaultValue={editedUser.banner_type} 
            //onChange={(e)=>setBanner_type(e.target.value)}
            InputProps={{ disableUnderline: true }}
            style={{ width: 320, border: " 1px solid ",borderRadius: '4px' }}
          />
           <Upload value={editedUser.banner_url} onChange={onChange} dataURLKey="data_url">
                <Button icon={<UploadOutlined />} >Click to Upload</Button>
                 </Upload></>)}</div>
              
                

      </Modal>
    </>
  );

}