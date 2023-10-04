import React from 'react';
import { useMainContext } from '../../context/MainContext';


const HeaderHumburger = () => {
  const { isShowNavbar, handleToggleNavbar } = useMainContext();

  const _onClickHumburger = () => {
    handleToggleNavbar();
  };

  return (
    <div className={`header__humburger ${isShowNavbar ? '--close' : ''}`} onClick={() => _onClickHumburger()}>
      <div className="header__humburger-button">
        <span />
        <span />
        <span />
      </div>
      <div className="header__humburger-text">
        <span>Menu</span>
        <span>Đóng</span>
      </div>
    </div>
  );
};

export default HeaderHumburger;
