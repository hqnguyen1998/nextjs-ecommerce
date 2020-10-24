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
import UserMenuPopup from './userMenuPopup';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}));

const Navbar = ({ navbarTitle = `<dev /> Community` }) => {
  const dispatch = useDispatch();
  const { isAuth, loggedUser } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.lightTheme);
  const classes = useStyles();

  const handleRoute = (route) => {
    Router.push(route);
  };

  const handleToggleLayoutTheme = () => {
    dispatch(toggleLayoutTheme());
  };

  const AuthLink = () => (
    <>
      <UserMenuPopup user={loggedUser} />
    </>
  );

  const NonAuthLink = () => (
    <>
      <IconButton color='inherit' onClick={() => handleRoute('/login')}>
        <PersonOutline />
      </IconButton>
    </>
  );

  return (
    <AppBar position='sticky' color='inherit'>
      <Container maxWidth='md'>
        <Toolbar>
          <Typography
            variant='h5'
            className={classes.title}
            onClick={() => handleRoute('/')}
          >
            {navbarTitle}
          </Typography>
          <div className={classes.root} />
          {isAuth ? <AuthLink /> : <NonAuthLink />}
          <IconButton color='inherit' onClick={handleToggleLayoutTheme}>
            {theme ? <Brightness4Sharp /> : <BrightnessHighSharp />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
