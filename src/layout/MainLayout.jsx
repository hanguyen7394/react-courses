import Footer from '../components/Footer';
import ModalLogin from '../components/ModalLogin';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import PageLoading from '../components/PageLoading';
import { Outlet } from 'react-router-dom';
import Overlay from '../components/Overlay';
import MainContextProvider from '../context/MainContext';
import AuthContextProvider from '../context/AuthContext';
import { useEffect } from 'react';

const MainLayout = () => {
  useEffect(() => {
    $(window).on('load', () => {
      $('.loading').addClass('--hide');
    });
  }, []);

  return (
    <MainContextProvider>
      <AuthContextProvider>
        <PageLoading />
        <Header />
        <Navbar />
        <Overlay />

        <Outlet />

        <Footer />
        <ModalLogin />
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
