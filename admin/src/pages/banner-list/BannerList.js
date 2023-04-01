
import React from "react";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
// styles
//import useStyles from './styles'

import {
  Grid,
  // LinearProgress,
  // Select,
  // OutlinedInput,
  // MenuItem,
  // Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import { ColumnProps, PaginationConfig, SorterResult } from 'antd/lib/table';
// data

const datatableData = [
  ["test", "test", "Banner 1", "<>",],
  ["test", "test", "Banner 2", "",],
  ["test", "test", "Banner 3", "",],
  ["test", "test", "Banner 4", "",],
  ["test", "test", "Banner 5", "",],
];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))
export default function BannerList(props) {

  return (
    <>
      <PageTitle title="Banner List" />
     
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Banner List"
            data={datatableData}
            columns={["Banner name","Banner type", "Image", "Action"]}
            
          />
          <table>
            <tr>
            <td>aaa</td>
            <td>aaa</td>
            <td>aaa</td>
            <td>aaa</td>
            </tr>
          </table>
        </Grid>
      </Grid>
    </>
  );

}