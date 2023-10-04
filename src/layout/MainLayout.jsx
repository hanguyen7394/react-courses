import Footer from '../components/Footer';
import ModalLogin from '../components/ModalLogin';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import PageLoading from '../components/PageLoading';
import { Outlet } from 'react-router-dom';
import Overlay from '../components/Overlay';
import MainContextProvider from '../context/MainContext';
import AuthContextProvider from '../context/AuthContext';
import { useEffect, useState } from 'react';
import ComponentLoading from '../components/ComponentLoading';

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <MainContextProvider>
      <AuthContextProvider>
        {loading ? (
          <ComponentLoading style={{ height: '100vh' }} />
        ) : (
          <>
            <Header />
            <Navbar />
            <Overlay />

            <Outlet />

            <Footer />
            <ModalLogin />
          </>
        )}
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
