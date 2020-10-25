import { Box, Button } from '@material-ui/core';
import UserProfileContainer from '../components/userProfileContainer';
import MainLayout from '../layouts/mainLayout';
import BasicUserProfile from '../components/basicUserProfile';
import fetch from 'isomorphic-unfetch';
import { useDispatch } from 'react-redux';
import React from 'react';
import { updateUserProfile } from '../redux/actions/userActions';

const Settings = ({ user }) => {
  const dispatch = useDispatch();

  const [profile, setProfile] = React.useState({
    email: user.email,
    summary: user.summary,
    showEmail: user.showEmail,
    first_name: user.first_name,
    last_name: user.last_name,
    location: user.location,
    website: user.website,
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();

    dispatch(updateUserProfile(user._id, profile));
  };

  return (
    <MainLayout title='Settings - Dev Community'>
      <Box mt={2} component='form'>
        <UserProfileContainer profile={profile} setProfile={setProfile} />
        <br />
        <BasicUserProfile profile={profile} setProfile={setProfile} />
        <br />
        <Button
          onClick={handleSaveProfile}
          variant='contained'
          color='primary'
          fullWidth
        >
          Save Profile Information
        </Button>
      </Box>
    </MainLayout>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const token = req.cookies.token;

  if (!token) {
    res.setHeader('Location', '/login');
    res.statusCode = 302;
    res.end();
    return {
      props: {},
    };
  }

  const response = await fetch(`${process.env.API_URL}/api/auth`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  });

  const { data } = await response.json();

  return {
    props: {
      user: data,
    },
  };
};

export default Settings;
