import { Box, List, ListItem } from '@material-ui/core';
import UserProfileContainer from '../components/userProfileContainer';
import MainLayout from '../layouts/mainLayout';
import fetch from 'isomorphic-unfetch';
import BasicUserProfile from '../components/basicUserProfile';

const Settings = ({ user }) => {
  return (
    <MainLayout title='Settings - Dev Community'>
      <Box mt={2}>
        <UserProfileContainer user={user} />
        <br />
        <BasicUserProfile />
      </Box>
    </MainLayout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const token = req.cookies.token;
  const res = await fetch(`${process.env.API_URL}/api/auth`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      authorization: token,
    },
  });
  const { data } = await res.json();

  return {
    props: {
      user: data,
    },
  };
};

export default Settings;
