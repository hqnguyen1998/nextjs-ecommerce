import fetch from 'isomorphic-unfetch';
import MainLayout from '../../layouts/mainLayout';

const Post = ({ post }) => {
  return (
    <MainLayout title={post.title}>
      <h1>{post.title}</h1>
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
