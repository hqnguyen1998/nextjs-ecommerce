import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import Moment from 'react-moment';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: '40%',
  },
  userInfoWrapper: {
    marginTop: theme.spacing(1),
    display: 'flex',
  },
  userNameText: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
  },
  linkText: {
    fontWeight: 'bold',
    color: '#08090A',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    textAlign: 'justify',
    '&:hover': {
      color: '#3b49df',
    },
  },
  avatar: {
    width: 30,
    height: 30,
  },
}));

const PostListItems = ({ post }) => {
  const classes = useStyles();
  const {
    _id,
    title,
    image,
    author: { avatar, first_name, last_name },
    slug,
    created_date,
  } = post;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          <CardMedia image={image} title={title} className={classes.media} />
          <div className={classes.userInfoWrapper}>
            <Avatar
              src={avatar}
              alt={`${first_name} ${last_name}`}
              className={classes.avatar}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant='body1'
                color='textPrimary'
                className={classes.userNameText}
              >
                {first_name} {last_name}
              </Typography>
              <Typography
                variant='subtitle1'
                color='textSecondary'
                style={{ marginLeft: 8 }}
              >
                <Moment format='MMM DD'>{created_date}</Moment> (
                <Moment fromNow>{created_date}</Moment>)
              </Typography>
            </div>
          </div>

          <Link href='/post/[slug]/[pid]' as={`/post/${slug}/${_id}`}>
            <a className={classes.link}>
              <Typography
                variant='h4'
                color='textPrimary'
                className={classes.linkText}
              >
                {title}
              </Typography>
            </a>
          </Link>
          {post.tags.map((tag, i) => (
            <Link href='/' key={i}>
              <a style={{ color: '#64707D', marginLeft: 5 }}>
                <Typography variant='caption'>#{tag}</Typography>
              </a>
            </Link>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostListItems;
