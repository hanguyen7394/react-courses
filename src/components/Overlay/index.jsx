import React from 'react';
import ReactDOM from 'react-dom';
import { useMainContext } from '../../context/MainContext';

const Overlay = () => {
  const { handleToggleNavbar } = useMainContext();

  const _onClickOverlay = () => {
    handleToggleNavbar();
  };

  return ReactDOM.createPortal(<div className="overlay" onClick={_onClickOverlay} />, document.body);
};

export default Overlay;
