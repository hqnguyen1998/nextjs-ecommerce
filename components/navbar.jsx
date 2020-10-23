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
  Avatar,
  Button,
} from '@material-ui/core';
import {
  PersonOutline,
  Brightness4Sharp,
  BrightnessHighSharp,
  ExitToAppOutlined,
  PostAddOutlined,
} from '@material-ui/icons';
// Redux actions
import { signOut } from '../redux/actions/userActions';
import { toggleLayoutTheme } from '../redux/actions/themeActions';

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

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const AuthLink = () => (
    <>
      <IconButton color='inherit'>
        <Avatar src={loggedUser.avatar} alt='avatar' />
      </IconButton>
      <Button
        variant='contained'
        color='primary'
        startIcon={<PostAddOutlined />}
        onClick={() => handleRoute('/new')}
      >
        Write a post
      </Button>
      <IconButton color='inherit' onClick={handleToggleLayoutTheme}>
        {theme ? <Brightness4Sharp /> : <BrightnessHighSharp />}
      </IconButton>
      <IconButton color='inherit' onClick={handleSignOut}>
        <ExitToAppOutlined />
      </IconButton>
    </>
  );

  const NonAuthLink = () => (
    <>
      <IconButton color='inherit' onClick={() => handleRoute('/login')}>
        <PersonOutline />
      </IconButton>
      <IconButton color='inherit' onClick={handleToggleLayoutTheme}>
        {theme ? <Brightness4Sharp /> : <BrightnessHighSharp />}
      </IconButton>
    </>
  );

  return (
    <AppBar position='static' color='transparent'>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
