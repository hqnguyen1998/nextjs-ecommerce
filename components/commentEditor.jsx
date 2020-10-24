import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import React from 'react';
import fetch from 'isomorphic-unfetch';

const useStyles = makeStyles(() => ({
  input: {
    fontSize: 20,
    padding: 10,
    lineHeight: '2.2rem',
  },
  root: {
    padding: 20,
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headingText: {
    fontWeight: 'bold',
  },
  button: {
    width: 150,
    fontWeight: 'bold',
  },
}));

const CommentEditor = ({ postId }) => {
  const classes = useStyles();
  const isAuth = useSelector((state) => state.user.isAuth);
  const token = useSelector((state) => state.user.token);

  const [text, setText] = React.useState('');

  const handleAddComment = async () => {
    const res = await fetch(`${process.env.API_URL}/api/comment/${postId}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ content: text }),
    });

    if (res.status === 200) {
      setText('');
      return;
    }
  };

  return (
    <Box mt={2} p={2}>
      <div className={classes.heading}>
        <Typography variant='h3' className={classes.headingText}>
          Discussion
        </Typography>
        {isAuth && (
          <Button
            onClick={handleAddComment}
            variant='outlined'
            color='inherit'
            className={classes.button}
          >
            Comment
          </Button>
        )}
      </div>
      {isAuth && (
        <TextField
          placeholder='Add your comment here'
          variant='outlined'
          multiline
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          InputProps={{
            classes: {
              root: classes.root,
              input: classes.input,
            },
          }}
          margin='dense'
          rows={5}
        />
      )}
    </Box>
  );
};

export default CommentEditor;
