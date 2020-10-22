import fetch from 'isomorphic-unfetch';
import MainLayout from '../../layouts/mainLayout';
import ReactMarkDown from 'react-markdown';
import gfm from 'remark-gfm';
import { makeStyles, Typography, Avatar, Paper, Box } from '@material-ui/core';
import Moment from 'react-moment';
import caculateReadingTime from '../../utils/caculateReadingTime';
import TagsList from '../../components/tagsList';

const useStyles = makeStyles((theme) => ({
  body: {
    fontSize: 23,
  },
  image: {
    width: '100%',
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 70,
  },
  userInfo: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  userName: {
    marginTop: theme.spacing(1),
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
  date: {
    fontSize: 20,
    marginTop: theme.spacing(1),
  },
}));

const Post = ({ post }) => {
  const classes = useStyles();
  const time = caculateReadingTime(post.body);

  const { avatar, first_name, last_name, email } = post.author;

  return (
    <MainLayout title={post.title}>
      <Paper square>
        {post.image && (
          <img src={post.image} alt={post.title} className={classes.image} />
        )}

        <Box p={2}>
          <Typography
            variant='h3'
            gutterBottom
            align='justify'
            className={classes.postTitle}
          >
            {post.title}
          </Typography>

          <TagsList tags={post.tags} />

          <div className={classes.userInfo}>
            <Avatar src={avatar} alt={email} className={classes.avatar} />
            <Typography variant='h4' className={classes.userName}>
              {first_name} {last_name}
            </Typography>
            <Typography
              variant='h4'
              className={classes.date}
              color='textSecondary'
            >
              <Moment format='MMM DD'>{post.created_date}</Moment>・{time}
            </Typography>
          </div>
          <Typography
            variant='body1'
            component='article'
            align='justify'
            className={classes.body}
          >
            <ReactMarkDown plugins={[gfm]} children={post.body} />
          </Typography>
        </Box>
      </Paper>
    </MainLayout>
  );
};

export const getStaticPaths = async () => {
  const response = await fetch(`${process.env.API_URL}/api/post`);

  const { data } = await response.json();

  const paths = data.map((post) => ({
    params: {
      slug: [post.author, post.slug],
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await fetch(
    `${process.env.API_URL}/api/post/${params.slug[1]}`
  );
  const { data } = await response.json();

  return {
    props: {
      post: data,
    },
  };
};

export default Post;
