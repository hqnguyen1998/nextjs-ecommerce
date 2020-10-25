import {
  Menu,
  IconButton,
  Avatar,
  MenuItem,
  makeStyles,
  Typography,
  Divider,
} from '@material-ui/core';
import Router from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/actions/userActions';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: '45px',
    width: 250,
    borderLeft: '2px solid #000',
    borderTop: '2px solid #000',
    borderRight: '8px solid #000',
    borderBottom: '8px solid #000',
  },
  userTitleText: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  avatar: {
    width: 30,
    height: 30,
  },
}));

const UserMenuPopup = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleRoute = (path) => {
    Router.push(path);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    Router.push('/');
  };

  return (
    <React.Fragment>
      <IconButton color='inherit' onClick={handleClick} size='medium'>
        <Avatar src={user.avatar} alt='avatar' className={classes.avatar} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        classes={{
          paper: classes.paper,
        }}
        transitionDuration='auto'
        onClose={handleClose}
      >
        <MenuItem style={{ display: 'block' }}>
          <Typography variant='h5' className={classes.userTitleText}>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant='body1' color='textSecondary'>
            @{user.email}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleRoute('/new')}>Write a Post</MenuItem>
        <MenuItem onClick={() => handleRoute('/settings')}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default UserMenuPopup;
