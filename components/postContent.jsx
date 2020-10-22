import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Paper, Box, Typography, Avatar, makeStyles } from '@material-ui/core';
import Moment from 'react-moment';
import ReactMarkDown from 'react-markdown';
import gfm from 'remark-gfm';
import caculateReadingTime from '../utils/caculateReadingTime';
import TagsList from '../components/tagsList';

const useStyles = makeStyles((theme) => ({
  body: {
    fontSize: 23,
    width: '100%',
    overflow: 'scroll',
  },
  image: {
    width: '100%',
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 70,
  },
  userInfo: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  userName: {
    marginTop: theme.spacing(1),
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
  date: {
    fontSize: 20,
    marginTop: theme.spacing(1),
  },
}));

const PostContent = ({ post }) => {
  const classes = useStyles();
  const [author, setAuthor] = React.useState({});

  React.useEffect(() => {
    const fetchAuthor = async () => {
      const res = await fetch(
        `${process.env.API_URL}/api/user?id=${post.author}`
      );

      const { data } = await res.json();

      return setAuthor(data);
    };

    fetchAuthor();
  }, []);

  const { avatar, email, first_name, last_name } = author;

  return (
    <React.Fragment>
      <Paper square>
        {post.image && (
          <img src={post.image} alt={post.title} className={classes.image} />
        )}

        <Box p={2}>
          <Typography
            variant='h3'
            gutterBottom
            align='justify'
            className={classes.postTitle}
          >
            {post.title}
          </Typography>

          <TagsList tags={post.tags} />

          <div className={classes.userInfo}>
            <Avatar src={avatar} alt={email} className={classes.avatar} />
            <Typography variant='h4' className={classes.userName}>
              {first_name} {last_name}
            </Typography>
            <Typography
              variant='h4'
              className={classes.date}
              color='textSecondary'
            >
              <Moment format='MMM DD'>{post.created_date}</Moment>・
              {caculateReadingTime(post.body)}
            </Typography>
          </div>
          <Typography
            variant='body1'
            component='article'
            align='justify'
            className={classes.body}
          >
            <ReactMarkDown plugins={[gfm]} children={post.body} />
          </Typography>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default PostContent;
