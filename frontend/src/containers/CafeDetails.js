import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, getCafe } from '../store/actions/cafeActions';
import {
  Box,
  Button,
  Grid, GridList, GridListTile, InputLabel, MenuItem, Select,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FileInput from '../components/Form/FileInput';
import { getImages, uploadImage } from '../store/actions/imageActions';
import Ratings from '../components/Ratings';
import FormElement from '../components/Form/FormElement';

const useStyles = makeStyles((theme) => ({
  gridCon: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  media: {
    borderRadius: '7px',
  },
  text: {
    marginTop: theme.spacing(2),
  },
  gridGallery: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTop: '1px solid #000000',
  },
  gridItemGallery: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(2, 0, 4, 0),
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  gridUploadPhoto: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(2),
    borderTop: '1px solid #000000',
  },
  gridItemUploadPhoto: {
    marginTop: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  btn: {
    marginTop: theme.spacing(2),
  },
  gridRatings: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid #000000',
    paddingTop: theme.spacing(2),
  },
  overallRating: {
    padding: theme.spacing(3),
  },
  rating: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  gridReviews: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid #000000',
    margin: theme.spacing(3, 0),
    padding: theme.spacing(2, 0),
  },
  gridReview: {
    marginTop: theme.spacing(2),
  },
  review: {
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  userRating: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    width: '310px',
  },
  commentForm: {
    margin: theme.spacing(3, 0),
  },
  selectRating: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  select: {
    width: '15%',
    marginTop: theme.spacing(3),
  },
  ratingBtn: {
    paddingTop: theme.spacing(4),
  },
}));

const CafeDetails = ({ match }) => {

  const [image, setImage] = useState({
    image: '',
    cafe: '',
  });

  const [rating, setRating] = useState({
    comment: '',
    foodRating: 5,
    serviceRating: 5,
    interiorRating: 5,
  });

  const dispatch = useDispatch();
  const { cafe, success: reviewSuccess } = useSelector(state => state.cafeDetails);
  const { images, success } = useSelector(state => state.galleryImage);

  const cafeId = match.params.id;

  useEffect(() => {
    dispatch(getCafe(cafeId));
    dispatch(getImages(cafe._id));

    setImage(prevState => {
      return { ...prevState, cafe: cafeId };
    });
  }, [dispatch, cafeId, cafe._id, reviewSuccess]);

  useEffect(() => {
    if (success) {
      dispatch(getImages(cafe._id));
    }
  }, [dispatch, cafe._id, success]);


  const fileChangeHandler = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setImage((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRating(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitRatingFormHandler = (e) => {
    e.preventDefault();

    dispatch(addReview(rating, cafe._id));

    setRating({
      comment: '',
      foodRating: 5,
      serviceRating: 5,
      interiorRating: 5,
    });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(image).forEach((key) => {
      formData.append(key, image[key]);
    });

    dispatch(uploadImage(formData));

    setImage({
      cafe: '',
      image: '',
    });
  };

  let averageFoodRating, averageServiceRating, averageInteriorRating;

  if (cafe && cafe.reviews) {
    averageFoodRating = cafe.reviews.reduce(
      (acc, item) => item.foodRating + acc, 0) / cafe.numReviews === 0 ? 0 : cafe.numReviews;

    averageServiceRating = cafe.reviews.reduce(
      (acc, item) => item.serviceRating + acc, 0) / cafe.numReviews === 0 ? 0 : cafe.numReviews;

    averageInteriorRating = cafe.reviews.reduce(
      (acc, item) => item.interiorRating + acc, 0) / cafe.numReviews === 0 ? 0 : cafe.numReviews;
  }

  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.gridCon}>
        <Grid item md={6}>
          <Typography variant={'h3'}>
            {cafe && cafe.title}
          </Typography>
          <Typography className={classes.text} variant={'subtitle1'}>
            {cafe && cafe.description}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Box>
            <img className={classes.media}
                 src={`http://localhost:8000/uploads/${cafe && cafe.image}`}
                 width={'100%'} alt=""/>
          </Box>
        </Grid>
      </Grid>
      <Grid container className={classes.gridGallery}>
        <Typography variant={'h5'}>Gallery</Typography>
        <Grid item xs={12} className={classes.gridItemGallery}>
          <GridList className={classes.gridList} cols={3.5}>
            {images && images.map((image) => (
              <GridListTile key={image.image}>
                <img src={`http://localhost:8000/uploads/${image.image}`}
                     alt=''/>
              </GridListTile>
            ))}
          </GridList>
        </Grid>
      </Grid>
      <Grid container className={classes.gridRatings}>
        <Typography variant={'h5'}>
          Ratings
        </Typography>
        <Grid item xs={3} className={classes.overallRating}>
          <Typography className={classes.rating} variant='subtitle1'
                      component="h2">
            <strong>Overall:</strong> <Ratings value={cafe.rating}
                                               text={Number(cafe.rating).toFixed(1)}/>
          </Typography>
          <Typography className={classes.rating} variant='subtitle1'
                      component="h2">
            Quality of food: <Ratings value={averageFoodRating}
                                      text={Number(averageFoodRating).toFixed(1)}/>
          </Typography>
          <Typography className={classes.rating} variant='subtitle1'
                      component="h2">
            Service quality: <Ratings value={averageServiceRating}
                                      text={Number(averageServiceRating).toFixed(1)}/>
          </Typography>
          <Typography className={classes.rating} variant='subtitle1'
                      component="h2">
            Interior: <Ratings value={averageInteriorRating}
                               text={Number(averageInteriorRating).toFixed(1)}/>
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.gridReviews}>
        <Typography variant={'h5'}>
          Reviews
        </Typography>
        <Grid item xs={12} className={classes.gridReview}>
          {cafe.reviews && cafe.reviews.map(review => (
            <div key={review._id} className={classes.review}>
              <Typography variant='subtitle1'>
                On {review.datetime}, <strong>{review.user.name}</strong> said:
              </Typography>
              <Typography variant='subtitle1'>
                {review.comment}
              </Typography>
              <Typography className={classes.userRating} variant='subtitle1'
                          component="h2">
                Quality of food: <Ratings value={review.foodRating}
                                          text={review.foodRating}/>
              </Typography>
              <Typography className={classes.userRating} variant='subtitle1'
                          component="h2">
                Service quality: <Ratings value={review.serviceRating}
                                          text={review.serviceRating}/>
              </Typography>
              <Typography className={classes.userRating} variant='subtitle1'
                          component="h2">
                Interior: <Ratings value={review.interiorRating}
                                   text={review.interiorRating}/>
              </Typography>
            </div>
          ))}
        </Grid>
      </Grid>
      <Typography variant={'h5'}>Add review</Typography>
      <form
        className={classes.commentForm}
        onSubmit={submitRatingFormHandler}
      >
        <FormElement
          name='comment'
          value={rating.comment}
          type='text'
          label="Comment"
          multiline
          rows={5}
          onChange={inputChangeHandler}
          required
        />
        <div className={classes.selectRating}>
          <FormControl className={classes.select}>
            <InputLabel>Quality of food</InputLabel>
            <Select
              value={rating.foodRating}
              name='foodRating'
              onChange={inputChangeHandler}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.select}>
            <InputLabel>Service quality</InputLabel>
            <Select
              name='serviceRating'
              value={rating.serviceRating}
              onChange={inputChangeHandler}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.select}>
            <InputLabel>Interior</InputLabel>
            <Select
              value={rating.interiorRating}
              name='interiorRating'
              onChange={inputChangeHandler}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.ratingBtn}>
            <Button
              type='submit'
              color='primary'
              variant='contained'
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      <Grid container className={classes.gridUploadPhoto}>
        <Typography variant={'h5'}>Upload new photo</Typography>
        <Grid item xs={4} className={classes.gridItemUploadPhoto}>
          <form
            className={classes.form}
            onSubmit={submitFormHandler}
          >
            <FormControl
              variant="outlined"
            >
              <FileInput
                label="Image"
                name="image"
                id="image"
                onChange={fileChangeHandler}
              />
            </FormControl>
            <Button
              className={classes.btn}
              type='submit'
              color='primary'
              variant='contained'
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default CafeDetails;