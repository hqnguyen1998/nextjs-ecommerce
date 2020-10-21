import axios from 'axios';
import MainLayout from '../../layouts/mainLayout';

const Post = () => {
  return (
    <MainLayout title='Post'>
      <h1>Post</h1>
    </MainLayout>
  );
};

// export const getStaticPaths = async () => {
//   const { data } = await axios.get(`${process.env.API_URL}/api/post`);

//   const paths = data.data.map((post) => ({
//     params: { slug: [post.author, post.slug] },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   const { data } = await axios({
//     url: `${process.env.API_URL}/api/post/${params.slug[1]}`,
//     method: 'GET',
//     headers: {
//       'Content-type': 'application/json',
//     },
//   });

//   return {
//     props: {
//       post: data.data,
//     },
//   };
// };

export default Post;