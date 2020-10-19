const { default: MainLayout } = require('../layouts/mainLayout');

const LoginPage = () => {
  return (
    <div>
      <MainLayout title='Login User'>
        <h1>Login Page</h1>
      </MainLayout>
    </div>
  );
};

export default LoginPage;
