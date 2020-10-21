import {
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
    marginBottom: theme.spacing(1),
  },
}));

const PostListItems = ({ post }) => {
  const classes = useStyles();
  const { title, description, image, author, slug } = post;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          <Link href='/post/[user]/[slug]' as={`/post/${author}/${slug}`}>
            <a>{title}</a>
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostListItems;
