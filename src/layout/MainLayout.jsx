import { Suspense, lazy } from 'react';
const Footer = lazy(() => import('../components/Footer'));
const ModalLogin = lazy(() => import('../components/ModalLogin'));
const Navbar = lazy(() => import('../components/Navbar'));
const Header = lazy(() => import('../components/Header'));
const Overlay = lazy(() => import('../components/Overlay'));
import { Outlet } from 'react-router-dom';
import MainContextProvider from '../context/MainContext';
import AuthContextProvider from '../context/AuthContext';
import ComponentLoading from '../components/ComponentLoading';

const MainLayout = () => {
  return (
    <MainContextProvider>
      <AuthContextProvider>
        <Suspense fallback={<ComponentLoading style={{height: '100vh'}} />}>
          <Header />
          <Navbar />
          <Overlay />

          <Outlet />

          <Footer />
          <ModalLogin />
        </Suspense>
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
