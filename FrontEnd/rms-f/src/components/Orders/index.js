import React from 'react';
import OrderForm from './OrderForm';
import { useForm } from "./hooks/useForm";
import { Grid, Button } from '@material-ui/core';
import SearchFoodItems from './SearchFoodItems';
import OrderedFoodItems from './OrderedFoodItems';
import SideBar from "../Sidebar/SideBar";
import { useHistory } from "react-router-dom";


import {
  BiPowerOff,
} from "react-icons/bi";

const generateOrderNumber = () =>
  Math.floor(10000 + Math.random() * 90000).toString();

const getFreshModelObject = () => ({
  orderNumber: generateOrderNumber(),
  foodName:'',
  foodPrice: 0,
  quantity: 1,
  gTotal: 0,
  orderDetails: [],
});


const Order = () => {

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = useForm(getFreshModelObject);

    const history = useHistory();
    
    const logOut = () => {
      localStorage.removeItem("token");
      history.push("/");
      window.location.reload();
    }

  return (
    <>
    <Grid container style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
        <Grid item xs={6}>
          <OrderForm
            {...{values, setValues, errors, handleInputChange, resetFormControls}}
          />
        </Grid>
        <Grid container  style={{display:"flex", justifyContent:"center"}}>
          <Grid item xs={3} >
            <SearchFoodItems 
              {...{ values, setValues }}
            />
          </Grid>
          <Grid item xs={3}>
            <OrderedFoodItems 
              {...{ values, setValues}}
            />
          </Grid>
        </Grid>
        <Grid style={{position:"relative", top: "40%"}}>
            <Button variant="contained" color="primary" endIcon={<BiPowerOff />} onClick={logOut}>
                Logout
            </Button>
          </Grid>
    </Grid>
    </>
  )
}

export default Order