import React from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import LoginForm from '../components/loginForm';
import MainLayout from '../layouts/mainLayout';

const LoginPage = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  React.useEffect(() => {
    if (isAuth) {
      Router.push('/');
    }
  }, [isAuth]);

  return (
    <div>
      <MainLayout title='Login User'>
        <LoginForm />
      </MainLayout>
    </div>
  );
};

export default LoginPage;
