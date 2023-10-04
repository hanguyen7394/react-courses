import { useLocation } from 'react-router-dom';
import HeaderAuthen from './HeaderAuthen';
import HeaderHumburger from './HeaderHumburger';
import HeaderLogo from './HeaderLogo';
import { PATH } from '../../constant/common';
import { useEffect } from 'react';

const Header = () => {
  const { pathname } = useLocation();
  const isTransparent = [PATH.HOME, PATH.ABOUT].includes(pathname);

  useEffect(() => {
    window.addEventListener('scroll', scrollBgHeader);

    return () => {
      window.removeEventListener('scroll', scrollBgHeader);
    };
  }, [isTransparent]);

  const scrollBgHeader = () => {
    let scrollY = $(window).scrollTop();
    if ($(".header").hasClass("--transparent")) {
      setBgHeader(scrollY);
    }
  }

  const setBgHeader = (scrollY) => {
    const $header = $('.header');
    if (scrollY > $(".header").height()) {
      $header.addClass("--bgwhite");
    } else {
      $header.removeClass("--bgwhite");
    }
  };

  return (
    <header className={`header ${isTransparent ? '--transparent' : '--bgwhite'}`}>
      <div className="container-fluid">
        <HeaderHumburger />
        <HeaderLogo />
        <HeaderAuthen />
      </div>
    </header>
  );
};

export default Header;
