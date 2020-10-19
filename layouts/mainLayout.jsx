import Head from 'next/head';
import Navbar from '../components/navbar';

const MainLayout = ({ title, children }) => {
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
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
