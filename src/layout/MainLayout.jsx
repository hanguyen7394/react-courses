import Footer from '../components/Footer';
import ModalLogin from '../components/ModalLogin';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Overlay from '../components/Overlay';
import { Outlet } from 'react-router-dom';
import MainContextProvider from '../context/MainContext';
import AuthContextProvider from '../context/AuthContext';

const MainLayout = () => {
  return (
    <MainContextProvider>
      <AuthContextProvider>
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
