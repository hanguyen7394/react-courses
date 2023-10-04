import React from 'react';
import ReactDOM from 'react-dom';
import { useAuthContext } from '../../context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { MODAL_TYPES } from '../../constant/common';

const ModalLogin = () => {
  const { showedModal, handleCloseModal } = useAuthContext();

  return ReactDOM.createPortal(
    <div className={`modal modallogin ${!!showedModal ? 'open' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__wrapper-close" onClick={handleCloseModal}>
          <img src="/img/close_icon.svg" alt="CFD Register" />
        </div>
        {showedModal === MODAL_TYPES.LOGIN && <LoginForm />}
        {showedModal === MODAL_TYPES.REGISTER && <RegisterForm />}
      </div>
      <div className="modal__overlay" onClick={handleCloseModal} />
    </div>,
    document.body
  );
};

export default ModalLogin;
