import React from 'react';
import Router from 'next/router';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  makeStyles,
} from '@material-ui/core';
import { PersonOutline } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const handleRoute = (route) => {
    Router.push(route);
  };

  return (
    <AppBar position='static' color='transparent'>
      <Container maxWidth='md'>
        <Toolbar>
          <Typography
            variant='h5'
            className={classes.title}
            onClick={() => handleRoute('/')}
          >
            Medium
          </Typography>
          <div className={classes.root} />
          <IconButton color='inherit' onClick={() => handleRoute('/login')}>
            <PersonOutline />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
