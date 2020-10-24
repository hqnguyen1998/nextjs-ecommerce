import React from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import {
  Avatar,
  Box,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import CommentEditor from './commentEditor';
import Spinner from './spinner';

const useStyles = makeStyles((theme) => ({
  headingWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  headingUser: {
    display: 'flex',
  },
  headingUserTitleText: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  commentDate: {
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ListComments = ({ postId }) => {
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  const currentUser = useSelector((state) => state.user.loggedUser);
  const { data, error } = useSWR(`/api/comment/${postId}`, fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <Spinner />;

  const handleDeleteComment = async (commentId) => {
    const res = await fetch(`${process.env.API_URL}/api/comment/${commentId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        postId: postId,
      }),
    });

    console.log(res.status);
  };

  return (
    <Box mt={2}>
      <Paper elevation={0} square>
        <CommentEditor postId={postId} />
        {data.data.map((comment) => (
          <Box
            p={2}
            mb={2}
            variant='outlined'
            component={Paper}
            square
            key={comment._id}
          >
            <div className={classes.headingWrapper}>
              <div className={classes.headingUser}>
                <Avatar src={comment.user.avatar} />
                <Typography
                  variant='h5'
                  className={classes.headingUserTitleText}
                >
                  {comment.user.first_name} {comment.user.last_name}
                </Typography>
              </div>
              <div>
                <Moment format='MMM DD' className={classes.commentDate}>
                  {comment.created_date}
                </Moment>
                {comment.user._id === currentUser._id && (
                  <IconButton
                    color='secondary'
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    <DeleteOutline />
                  </IconButton>
                )}
              </div>
            </div>

            <Typography variant='h5'>{comment.content}</Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default ListComments;
