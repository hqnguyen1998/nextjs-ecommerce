import Head from 'next/head';
import { Container, Grid } from '@material-ui/core';
import Navbar from '../components/navbar';

const MainLayout = ({
  title,
  navbarTitle,
  children,
  LeftSideNav,
  RightSideNav,
}) => {
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
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid item md={2}>
            {LeftSideNav}
          </Grid>
          <Grid item md={8}>
            {children}
          </Grid>
          <Grid item md={2}>
            {RightSideNav}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MainLayout;
