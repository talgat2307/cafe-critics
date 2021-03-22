import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCafe, getCafeList } from '../store/actions/cafeActions';
import Loader from '../components/Loader';
import { Grid } from '@material-ui/core';
import Cafe from '../components/Cafe';

const useStyles = makeStyles((theme) => ({
  gridCon: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  gridItem: {
    display: 'flex',
    width: '20%',
  },
}));

const Home = ({ history }) => {

  const dispatch = useDispatch();
  const cafeList = useSelector(state => state.cafeList);

  const { loading, cafes } = cafeList;

  useEffect(() => {
    dispatch(getCafeList());
  }, [dispatch]);

  const clickHandler = (id) => {
    history.push(`cafe/${id}`);
  };

  const clickDeleteHandler = (id) => {
    dispatch(deleteCafe(id));
  };

  const classes = useStyles();
  return (
    <>
      <Typography variant='h4'>
        All places
      </Typography>
      {loading ?
        <Loader open={loading}/>
        :
        <Grid container className={classes.gridCon}>
          {cafes.map(cafe => {
            return (
              <Grid
                key={cafe._id}
                item xs={12} sm={6} md={4} lg={3}
                className={classes.gridItem}>
                <Cafe
                  onClick={() => clickHandler(cafe._id)}
                  onClickName={() => clickHandler(cafe._id)}
                  onClickDelete={() => clickDeleteHandler(cafe._id)}
                  cafe={cafe}/>
              </Grid>
            );
          })}
        </Grid>
      }
    </>
  );
};

export default Home;