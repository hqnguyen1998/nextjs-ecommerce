import LoginForm from '../components/loginForm';
import MainLayout from '../layouts/mainLayout';

const LoginPage = () => {
  return (
    <div>
      <MainLayout title='Login User'>
        <LoginForm />
      </MainLayout>
    </div>
  );
};

export default LoginPage;
