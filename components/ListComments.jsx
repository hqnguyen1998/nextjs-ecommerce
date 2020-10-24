import React from 'react';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import CommentEditor from './commentEditor';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ListComments = ({ postId }) => {
  const { data, error } = useSWR(`/api/comment/${postId}`, fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

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
            <div style={{ display: 'flex' }}>
              <Avatar src={comment.user.avatar} />
              <Typography
                variant='h5'
                style={{
                  marginTop: 8,
                  marginLeft: 10,
                  textTransform: 'capitalize',
                }}
              >
                {comment.user.first_name} {comment.user.last_name}
              </Typography>
            </div>

            <h1>{comment.content}</h1>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default ListComments;
