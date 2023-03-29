
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

// data

const datatableData = [
  ["test", "test", "Banner 1", "",],
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
      <div>hhiii</div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Banner List"
            data={datatableData}
            columns={["Banner name","Banner type", "Image", "Action"]}
            // options={{
            //   filterType: "checkbox",
            // }}
          />
        </Grid>
      </Grid>
    </>
  );

}