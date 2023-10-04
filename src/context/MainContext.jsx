import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
  const [isShowNavbar, setIsShowNavbar] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setIsShowNavbar(false);
  }, [pathname]);

  useEffect(() => {
    if (isShowNavbar) {
      $('body').addClass('menu-show');
    } else {
      $('body').removeClass('menu-show');
    }
  }, [isShowNavbar]);

  const handleToggleNavbar = () => {
    setIsShowNavbar(!isShowNavbar);
  };

  return <MainContext.Provider value={{ isShowNavbar, handleToggleNavbar }}>{children}</MainContext.Provider>;
};

export const useMainContext = () => useContext(MainContext);

export default MainContextProvider;
