import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import Input from '../Input';
import { regrexRule, requireRule } from '../../utils/validate';
import Button from '../Button';
import ComponentLoading from '../ComponentLoading';
import useForm from '../../hooks/useForm';
import { MODAL_TYPES } from '../../constant/common';

const rules = {
  name: [
    requireRule('Vui lòng nhập họ và tên')
  ],
  email: [
    requireRule('Vui lòng nhập email'),
    regrexRule('email','Vui lòng nhập đúng định dạng email')
  ],
  password: [
    requireRule('Vui lòng nhập mật khẩu')
  ],
  confirmPassword: [
    requireRule('Vui lòng xác nhận mật khẩu'),
    (value, values) => {
      if (value.password && value !== values.password) {
        return 'Mật khẩu xác nhận không đúng';
      } else {
        return false;
      }
    },
  ],
};

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { handleShowModal, handleCloseModal, handleRegister } = useAuthContext();
  const { register, validate, form } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }, rules);

  const _onSubmit = (e) => {
    e?.preventDefault();
    const errObj = validate(rules, form);

    if (!Object.keys(errObj).length) {
      setLoading(true);
      handleRegister(form, () => {
        setTimeout(() => {
          setLoading(false);
          handleCloseModal();
        }, 300);
      })
    }
  };

  return (
    <div className="modal__wrapper-content mdregister active">
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div className="color--primary btnmodal" onClick={() => handleShowModal(MODAL_TYPES.LOGIN)}>
          <strong>Đăng nhập</strong>
        </div>
      </div>
      <form className="form" onSubmit={(e) => _onSubmit(e)}>
        <Input {...register('name')} placeholder="Họ và tên"/>
        <Input {...register('email')} placeholder="Email"/>
        <Input {...register('password')} type="password" placeholder="Mật khẩu"/>
        <Input {...register('confirmPassword')} type="password" placeholder="Xác nhận mật khẩu"/>
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý
          <a className="color--primary" href="#">
            Chính Sách Điều Khoản
          </a>{' '}
          của CFD
        </p>
        <Button className="btn btn--primary form__btn-register" type="submit">
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
