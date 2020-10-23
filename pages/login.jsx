import React, { useEffect } from 'react';
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

export default LoginPage;
