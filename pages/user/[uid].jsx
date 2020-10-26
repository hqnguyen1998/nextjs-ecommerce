import MainLayout from '../../layouts/mainLayout';
import fetch from 'isomorphic-unfetch';
import { Avatar, Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { CakeOutlined } from '@material-ui/icons';
import Moment from 'react-moment';
import PostListItems from '../../components/postListItems';

const useStyles = makeStyles(() => ({
  userNameText: {
    textTransform: 'uppercase',
  },
}));

const UserProfilePage = ({ user }) => {
  const classes = useStyles();
  return (
    <>
      <MainLayout
        title={`${user.first_name} ${user.last_name} - DEV Community`}
        navbarTitle='DEV Community'
        maxWidth='xl'
      >
        <Box component={Paper} p={2}>
          <div style={{ width: '100%', marginBottom: 10 }}>
            <Avatar
              src={user.avatar}
              alt='Avatar'
              style={{ margin: 'auto', width: '100px', height: '100px' }}
            />
          </div>

          <Typography
            align='center'
            variant='h3'
            className={classes.userNameText}
          >
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant='body1' color='textSecondary' align='center'>
            {user.email}
          </Typography>
          <br />
          <Typography variant='h4' align='center' color='textPrimary'>
            {user.summary ? user.summary : '404 bio not found'}
          </Typography>
          <br />
          <Typography variant='subtitle2' align='center'>
            <CakeOutlined /> Joined on{' '}
            <Moment format='MMM DD, YYYY'>{user.created_date}</Moment>
          </Typography>
        </Box>
        <br />
        <Box>
          {user.posts.map((post) => (
            <PostListItems key={post._id} post={post} />
          ))}
        </Box>
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const {
    query: { uid },
    res,
  } = ctx;

  const response = await fetch(`${process.env.API_URL}/api/user/${uid}`, {
    method: 'GET',
  });

  if (response.status !== 200) {
    res.setHeader('Location', '/');
    res.statusCode = 302;
    res.end();

    return {
      props: {},
    };
  }

  const { data } = await response.json();

  return {
    props: {
      user: data,
    },
  };
};

export default UserProfilePage;
