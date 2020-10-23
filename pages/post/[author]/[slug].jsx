import fetch from 'isomorphic-unfetch';
import MainLayout from '../../../layouts/mainLayout';
import PostContent from '../../../components/postContent';

const Post = ({ post }) => {
  return Object.keys(post).length > 0 ? (
    <MainLayout
      navbarTitle={`${post.author.first_name} ${post.author.last_name} `}
      title={post.title}
    >
      <PostContent post={post} />
    </MainLayout>
  ) : (
    <MainLayout title='404 Page not found'>
      <h1>Page Not Found!</h1>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const slug = ctx.params.slug;
  const authorId = ctx.params.author;
  let post;

  const response = await fetch(`${process.env.API_URL}/api/post`);
  const { data } = await response.json();

  const filterData = data.filter(
    (post) => post.author._id === authorId && post.slug === slug
  );

  if (filterData.length > 0) {
    post = filterData[0];
  } else {
    post = {};
  }

  return {
    props: {
      post: post,
    },
  };
};

export default Post;
