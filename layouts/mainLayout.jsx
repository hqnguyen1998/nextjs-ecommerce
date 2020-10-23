import Head from 'next/head';
import { Container } from '@material-ui/core';
import Navbar from '../components/navbar';

const MainLayout = ({ title, navbarTitle, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Navbar navbarTitle={navbarTitle} />
      <br />
      <Container maxWidth='md'>{children}</Container>
    </div>
  );
};

export default MainLayout;
