import Link from 'next/link';
import axios from 'axios';
import { List, ListItem, Divider, Grid } from '@material-ui/core';
import MainLayout from '../layouts/mainLayout';
import PostListItems from '../components/postListItems';

function Home({ posts }) {
  return (
    <div>
      <MainLayout title='Home Page'>
        {posts.map((post) => (
          <PostListItems key={post._id} post={post} />
        ))}
        <h1>Posts</h1>
      </MainLayout>
    </div>
  );
}

export const getStaticProps = async () => {
  const { data } = await axios({
    url: `${process.env.API_URL}/api/post`,
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });

  return {
    props: {
      posts: data.data,
    },
  };
};

export default Home;
