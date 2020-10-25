import React, { useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import LoginForm from '../components/loginForm';
import MainLayout from '../layouts/mainLayout';
import Alert from '../components/alert';
import { Typography } from '@material-ui/core';

const LoginPage = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    isAuth && Router.push('/');
  }, [isAuth]);

  return (
    <div>
      <MainLayout title='Login User'>
        {Object.keys(error).length > 0 && <Alert alert={error} />}
        <LoginForm />
        <Typography variant='caption' color='textSecondary'>
          Do not have an account ?{' '}
          <Link href='/register'>
            <a style={{ textDecoration: 'none' }}>Register now!</a>
          </Link>
        </Typography>
      </MainLayout>
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const token = req.cookies.token;

  if (!token) {
    return {
      props: {},
    };
  }

  const response = await fetch(`${process.env.API_URL}/api/auth`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  });

  if (response.statusText === 'OK') {
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  }

  return {
    props: {},
  };
};

export default LoginPage;
