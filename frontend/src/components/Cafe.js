import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography, Button,
} from '@material-ui/core';
import Ratings from './Ratings';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  media: {
    paddingBottom: theme.spacing(2),
    height: '230px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  name: {
    cursor: 'pointer',
    flexGrow: 1,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: '#054fda',
    },
  },
  btn: {
    marginTop: '10px'
  },
}));

const Cafe = ({ cafe, onClick, onClickDelete }) => {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const classes = useStyles();
  return (
    <>
      <Card
        className={classes.card}
        elevation={0}
      >
        <CardContent className={classes.cardContent}>
          <CardMedia
            component="img"
            onClick={onClick}
            className={classes.media}
            image={`http://localhost:8000/uploads/${cafe.image}`}
          />
          <Typography className={classes.name} variant='h5'>
            <Link className={classes.link} to={`/cafe/${cafe._id}`}>
              {cafe.title}
            </Link>
          </Typography>
          <Typography className={classes.rating} variant='subtitle1'
                      component="h2">
            <Ratings value={cafe.rating} text={`${cafe.numReviews} reviews`}/>
          </Typography>
          {userInfo && userInfo.role === 'admin' ?
            <Button
              className={classes.btn}
              onClick={onClickDelete}
              variant={'outlined'}
            >Delete</Button> : null}
        </CardContent>
      </Card>
    </>
  );
};

export default Cafe;