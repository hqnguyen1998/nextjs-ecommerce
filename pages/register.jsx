import { useEffect } from 'react';
import Router from 'next/router';
import { handleAuth } from '../utils/utils';
import { useSelector } from 'react-redux';
import MainLayout from '../layouts/mainLayout';
import RegisterForm from '../components/registerForm';
import Alert from '../components/alert';

const Register = () => {
  const error = useSelector((state) => state.user.error);
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    isAuth && Router.push('/');
  }, [isAuth]);

  return (
    <MainLayout title='Register User'>
      {Object.keys(error).length > 0 && <Alert alert={error} />}
      <RegisterForm />
    </MainLayout>
  );
};

export const getServerSideProps = (ctx) => {
  handleAuth(ctx);

  return {
    props: {},
  };
};

export default Register;
