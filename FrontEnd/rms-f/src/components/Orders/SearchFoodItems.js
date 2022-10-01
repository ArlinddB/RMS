import React, {useState, useEffect} from 'react';
import axios from "axios";
import { List, ListItem, ListItemText, Paper, InputBase, IconButton, makeStyles, ListItemSecondaryAction, Grid } from '@material-ui/core';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        marginRight:32,
        marginLeft: 11,
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1,
    },
    listRoot: {
        marginTop: theme.spacing(1),
        marginRight:31 ,
        maxHeight: 250,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

export default function SearchFoodItems(props) {

    const { values, setValues } = props;
    let orderedFastFood = values.orderDetails;

    
    const [fastFood, setFastFood] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();

    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }


    useEffect(() => {
        axios.get("https://localhost:5001/api/FastFood/", config)
        .then((res) => {
            setFastFood(res.data);
            setSearchList(res.data);
        });
      }, []);


      useEffect(() => {
        let x = [...fastFood];
        x = x.filter(y=> {
            return y.foodName.toLowerCase().includes(searchKey.toLocaleLowerCase())
            && orderedFastFood.every(item => item.foodName != y.foodName)
        });
        setSearchList(x);

      }, [searchKey, orderedFastFood])

      const addFastFood = fastFood => {
        let x ={
          orderMasterId: values.orderMasterId,
          foodName: fastFood.foodName,
          foodPrice: fastFood.foodPrice,
          quantity: 1
        }
        setValues({
          ...values,
          orderDetails: [...values.orderDetails, x]
        })
      }

  return (
      <>
      {/* <Grid item xs={6}> */}
      <Paper className={classes.searchPaper}>
          <InputBase className={classes.searchInput}
            value={searchKey}
            onChange={e=> setSearchKey(e.target.value)}
            placeholder = "Search"
          />
          <IconButton>
              <SearchTwoToneIcon />
          </IconButton>
      </Paper>
        <List className={classes.listRoot}>
            {searchList && searchList.map((item, index) => (
                <ListItem
                    key={index}
                >
                    <ListItemText 
                        primary={item.foodName}
                        secondary={item.foodPrice+"€"}
                        onClick={e => addFastFood(item)}
                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={e => addFastFood(item)}>
                            <PlusOneIcon />
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>                    
            ))}
        </List>
        {/* </Grid> */}
    </>
  )
}
