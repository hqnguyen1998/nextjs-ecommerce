import fetch from 'isomorphic-unfetch';
import MainLayout from '../layouts/mainLayout';
import PostListItems from '../components/postListItems';

function Home({ posts }) {
  return (
    <div>
      <MainLayout title='<Dev /> Community'>
        {posts.map((post) => (
          <PostListItems key={post._id} post={post} />
        ))}
      </MainLayout>
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch(`${process.env.API_URL}/api/post`);
  const { data } = await response.json();

  return {
    props: {
      posts: data,
    },
  };
};

export default Home;
