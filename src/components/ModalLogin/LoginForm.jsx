import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import Input from '../Input';
import Button from '../Button';
import useForm from '../../hooks/useForm';
import ComponentLoading from '../ComponentLoading';
import { regrexRule, requireRule } from '../../utils/validate';
import { MODAL_TYPES } from '../../constant/common';

const rules = {
  email: [
    requireRule('Vui lòng nhập email'),
    regrexRule('email', 'Vui lòng nhập đúng định dạng email')
  ],
  password: [
    requireRule('Vui lòng nhập mật khẩu')
  ],
};

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { handleShowModal, handleCloseModal, handleLogin } = useAuthContext();
  const { register, validate, form } = useForm(
    {
      email: '',
      password: '',
    },
    rules
  );

  const _onSubmit = (e) => {
    e?.preventDefault();
    const errObj = validate();

    if (!Object.keys(errObj)?.length) {
      setLoading(true);
      handleLogin(form, () => {
        setTimeout(() => {
          setLoading(false);
          handleCloseModal();
        }, 300);
      });
    }
  };

  return (
    <div className="modal__wrapper-content mdlogin active">
      {loading && <ComponentLoading style={{minHeight: '30vh'}} />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div className="color--primary btnmodal" onClick={() => handleShowModal(MODAL_TYPES.REGISTER)}>
          <strong>Đăng ký</strong>
        </div>
      </div>
      <form className="form" onSubmit={(e) => _onSubmit(e)}>
        <Input {...register('email')} placeholder="Email" label="Email" />
        <Input {...register('password')} type="password" placeholder="Mật khẩu" label="Mật khẩu" />
        <Button className="btn btn--primary form__btn-register" type="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
