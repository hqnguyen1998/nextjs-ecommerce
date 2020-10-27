import MainLayout from '../../layouts/mainLayout';
import fetch from 'isomorphic-unfetch';
import {
  Avatar,
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  CakeOutlined,
  LocationOn,
  Facebook,
  Instagram,
  GitHub,
  LinkedIn,
  YouTube,
  Link,
} from '@material-ui/icons';
import Moment from 'react-moment';
import PostListItems from '../../components/postListItems';
import SocialMediaButton from '../../components/socialMediaButton';

const useStyles = makeStyles((theme) => ({
  userNameText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    color: theme.palette.text.secondary,
    margin: '0px 15px',
  },
  userInfoIcon: {
    marginRight: 5,
  },
}));

const UserSideAbout = ({ avatar, first_name, last_name, summary }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <img src={avatar} style={{ width: '131px', marginBottom: 20 }} />

      <Typography variant='caption' color='textSecondary'>
        ABOUT
      </Typography>
      <Typography
        variant='h6'
        color='textPrimary'
        style={{ textTransform: 'capitalize' }}
      >
        {first_name} {last_name}
      </Typography>
      <Typography variant='body1' color='textSecondary'>
        {summary}
      </Typography>
    </div>
  );
};

const UserProfilePage = ({
  user: {
    first_name,
    last_name,
    avatar,
    summary,
    showEmail,
    website,
    links,
    posts,
    location,
    email,
    created_date,
  },
}) => {
  const classes = useStyles();
  return (
    <>
      <MainLayout
        title={`${first_name} ${last_name} - DEV Community`}
        maxWidth='lg'
        LeftSideNav={
          <UserSideAbout
            avatar={avatar}
            first_name={first_name}
            last_name={last_name}
            summary={summary}
          />
        }
      >
        <Box component={Paper} p={2}>
          <div style={{ width: '100%', marginBottom: 10 }}>
            <Avatar
              src={avatar}
              alt='Avatar'
              style={{ margin: 'auto', width: '100px', height: '100px' }}
            />
          </div>

          <Typography
            align='center'
            variant='h3'
            className={classes.userNameText}
          >
            {first_name} {last_name}
          </Typography>

          <br />
          <Typography
            variant='h5'
            component='p'
            align='center'
            color='textPrimary'
          >
            {summary ? summary : '404 bio not found'}
          </Typography>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {location && (
              <div className={classes.userInfo}>
                <LocationOn className={classes.userInfoIcon} />
                <Typography variant='h6' align='center'>
                  {location}
                </Typography>
              </div>
            )}

            <div className={classes.userInfo}>
              <CakeOutlined className={classes.userInfoIcon} />
              <Typography variant='h6' align='center'>
                Joined on <Moment format='MMM DD, YYYY'>{created_date}</Moment>
              </Typography>
            </div>

            <div>
              {links.facebook && (
                <SocialMediaButton url={links.facebook}>
                  <Facebook />
                </SocialMediaButton>
              )}
              {links.instagram && (
                <SocialMediaButton url={links.instagram}>
                  <Instagram />
                </SocialMediaButton>
              )}
              {links.github && (
                <SocialMediaButton url={links.github}>
                  <GitHub />
                </SocialMediaButton>
              )}
              {links.youtube && (
                <SocialMediaButton url={links.youtube}>
                  <YouTube />
                </SocialMediaButton>
              )}
              {links.linkedIn && (
                <SocialMediaButton url={links.linkedIn}>
                  <LinkedIn />
                </SocialMediaButton>
              )}
              {website && (
                <SocialMediaButton url={website}>
                  <Link />
                </SocialMediaButton>
              )}
            </div>
          </div>
        </Box>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Paper style={{ padding: 10 }}>
              <Typography
                variant='h4'
                style={{ fontWeight: 'bold' }}
                align='center'
              >
                {posts.length}
              </Typography>
              <Typography variant='h6' color='textSecondary' align='center'>
                Total Posts
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <br />
        <Box>
          {posts.map((post) => (
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
