import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    marginRight: 10,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const SocialMediaButton = ({ url, children }) => {
  const classes = useStyles();
  return (
    <Link href={url}>
      <a className={classes.root}>{children}</a>
    </Link>
  );
};

export default SocialMediaButton;
