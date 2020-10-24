import { useEffect } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import MainLayout from '../../../layouts/mainLayout';
import PostContent from '../../../components/postContent';
import ListCommentList from '../../../components/listComments';

const Post = ({ post, status }) => {
  useEffect(() => {
    if (status !== 200) {
      Router.push('/');
    }
  }, [status]);

  return (
    Object.keys(post).length > 0 && (
      <MainLayout
        navbarTitle={`${post.author.first_name} ${post.author.last_name} `}
        title={post.title}
      >
        <PostContent post={post} />
        <ListCommentList postId={post._id} />
      </MainLayout>
    )
  );
};

export const getServerSideProps = async (ctx) => {
  const slug = ctx.params.slug;
  const postId = ctx.params.pid;

  const res = await fetch(`${process.env.API_URL}/api/post/${slug}/${postId}`);

  const { data } = await res.json();

  return {
    props: {
      post: data ? data : {},
      status: res.status,
    },
  };
};

export default Post;
