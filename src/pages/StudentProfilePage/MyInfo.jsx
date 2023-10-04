import React, { useEffect, useState } from 'react';
import Input from '../../components/Input';
import useForm from '../../hooks/useForm';
import { regrexRule, requireRule } from '../../utils/validate';
import { useAuthContext } from '../../context/AuthContext';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import ComponentLoading from '../../components/ComponentLoading';
import useDebounce from '../../hooks/useDebounce';

const rules = {
  firstName: [requireRule('Vui lòng nhập tên')],
  email: [requireRule('Vui lòng nhập email'), regrexRule('email', 'Vui lòng nhập đúng định dạng email')],
  phone: [requireRule('Vui lòng nhập số điện thoại'), regrexRule('phone', 'Vui lòng nhập đúng định dạng số điện thoại')],
  website: [regrexRule('url', 'Vui lòng nhập đúng định dạng liên kết')],
  facebookURL: [regrexRule('url', 'Vui lòng nhập đúng định dạng liên kết')],
};

const MyInfo = () => {
  const [loading, setLoading] = useState(true);
  const { profile, handleUpdateProfile } = useAuthContext();

  const { form, register, setForm, validate } = useForm(
    {
      firstName: '',
      email: '',
      phone: '',
      introduce: '',
      website: '',
      facebookURL: '',
      password: '********',
    },
    rules
  );

  useEffect(() => {
    setLoading(false);
    if (profile) {
      setForm({
        ...form,
        ...profile,
      });
    }
  }, [profile]);

  const loadingDebounce = useDebounce(loading, 300);

  const _onSubmit = (e) => {
    e.preventDefault();
    const errObj = validate();
    if (!Object.keys(errObj)?.length) {
      handleUpdateProfile(form);
    }
  };

  return (
    <div className="tab__content-item" style={{ position: 'relative' }}>
      {loadingDebounce ? (
        <ComponentLoading />
      ) : (
        <form action="#" className="form">
          <div className="form-container">
            <Input label="Họ và tên" required placeholder="Họ và tên" {...register('firstName')} />
            <Input label="Số điện thoại" required placeholder="Số điện thoại" {...register('phone')} />
          </div>
          <div className="form-container">
            <Input label="Email" required placeholder="Email" disabled {...register('email')} />
            <Input
              label="Mật khẩu"
              type="password"
              disabled
              required
              placeholder="Mật khẩu"
              {...register('password')}
            />
          </div>
          <Input label="Facebook URL" placeholder="Facebook URL" {...register('facebookURL')} />
          <Input label="Website" placeholder="Website" {...register('website')} />
          <Input
            label="Giới thiệu bản thân"
            placeholder="Giới thiệu bản thân"
            renderInput={(inputProps) => <TextArea {...inputProps} />}
            {...register('introduce')}
          />
          <div className="form-group">
            <div className="btnsubmit">
              <Button type="submit" className="btn btn--primary" onClick={_onSubmit}>
                Lưu lại
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default MyInfo;
