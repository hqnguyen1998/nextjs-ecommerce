import fetch from 'isomorphic-unfetch';
import MainLayout from '../../layouts/mainLayout';
import PostContent from '../../components/postContent';

const Post = ({ post }) => {
  return Object.keys(post).length > 0 ? (
    <MainLayout title={post.title}>
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
  let post;

  const response = await fetch(`${process.env.API_URL}/api/post`);
  const { data } = await response.json();

  const filterData = data.filter(
    (post) => post.author === slug[0] && post.slug === slug[1]
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

// export const getStaticPaths = async () => {
//   const response = await fetch(`${process.env.API_URL}/api/post`);

//   const { data } = await response.json();

//   const paths = data.map((post) => ({
//     params: {
//       slug: [post.author, post.slug],
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   const response = await fetch(
//     `${process.env.API_URL}/api/post/${params.slug[1]}`
//   );
//   const { data } = await response.json();

//   return {
//     props: {
//       post: data,
//     },
//   };
// };

export default Post;
