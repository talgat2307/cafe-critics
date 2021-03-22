import React from 'react';
import Header from './Header';
import { Container } from '@material-ui/core';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <>
      <Header/>
      <Container>
        <main>
          {props.children}
        </main>
      </Container>
      <Footer/>
    </>
  );
};

export default Layout;