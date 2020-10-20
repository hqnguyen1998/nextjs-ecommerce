import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  makeStyles,
} from '@material-ui/core';
import {
  PersonOutline,
  Brightness4Sharp,
  BrightnessHighSharp,
} from '@material-ui/icons';
// Redux actions
import { toggleLayoutTheme } from '../redux/actions/themeActions';

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
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.lightTheme);
  const classes = useStyles();

  const handleRoute = (route) => {
    Router.push(route);
  };

  const handleToggleLayoutTheme = () => {
    dispatch(toggleLayoutTheme());
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
          <IconButton color='inherit' onClick={handleToggleLayoutTheme}>
            {theme ? <Brightness4Sharp /> : <BrightnessHighSharp />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
