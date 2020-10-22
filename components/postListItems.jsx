import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
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
    fontSize: 17,
    padding: 10,
  },
  link: {
    textDecoration: 'none',
  },
  linkText: {
    fontWeight: 'bold',
    padding: 30,
    '&:hover': {
      color: '#3b49df',
    },
  },
}));

const PostListItems = ({ post }) => {
  const classes = useStyles();
  const {
    title,
    image,
    author: { avatar, _id, first_name, last_name },
    slug,
  } = post;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          <CardMedia image={image} title={title} className={classes.media} />
          <div className={classes.userInfoWrapper}>
            <Avatar src={avatar} alt={`${first_name} ${last_name}`} />
            <Typography
              variant='body1'
              color='textSecondary'
              className={classes.userNameText}
            >
              {first_name} {last_name}
            </Typography>
          </div>

          <Link href='/post/[user]/[slug]' as={`/post/${_id}/${slug}`}>
            <a className={classes.link}>
              <Typography
                variant='h3'
                color='textPrimary'
                className={classes.linkText}
              >
                {title}
              </Typography>
            </a>
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostListItems;
