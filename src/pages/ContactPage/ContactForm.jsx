import React, { useState } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import useForm from '../../hooks/useForm';
import { regrexRule, requireRule } from '../../utils/validate';
import { message } from 'antd';

const rules = {
  name: [requireRule('Vui lòng nhập họ và tên')],
  email: [requireRule('Vui lòng nhập email'), regrexRule('email', 'Vui lòng nhập đúng định dạng email')],
  phone: [
    requireRule('Vui lòng nhập số điện thoại'),
    regrexRule('phone', 'Vui lòng nhập đúng định dạng số điện thoại'),
  ],
  topic: [requireRule('Vui lòng nhập chủ đề')],
  content: [requireRule('Vui lòng nhập nội dung')],
};

const ContactForm = () => {
  const { register, validate } = useForm(
    {
      name: '',
      email: '',
      phone: '',
      topic: '',
      content: '',
    },
    rules
  );

  const _onSubmit = () => {
    const errorObj = validate();
    if (!Object.keys(errorObj).length) {
      message.success('Gửi yêu cầu thành công');
    }
  };

  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
      <Input label="Họ và tên" placeholder="Họ và tên" required {...register('name')} />
      <Input label="Email" placeholder="Email" required {...register('email')} />
      <Input label="Số điện thoại" placeholder="Số điện thoại" required {...register('phone')} />
      <Input
        label="Chủ đề cần hỗ trợ"
        placeholder="Chủ đề cần hỗ trợ"
        required
        renderInput={(inputProps) => (
          <Select
            options={[
              { value: '', label: '--' },
              { value: 'responsive', label: 'Web Responsive' },
              { value: 'react', label: 'React' },
            ]}
            {...inputProps}
          />
        )}
        {...register('topic')}
      />
      <Input
        label="Nội dung"
        placeholder="Nội dung"
        required
        renderInput={(inputProps) => <TextArea {...inputProps} />}
        {...register('content')}
      />
      <div className="btncontrol">
        <Button variant="primary" onClick={_onSubmit}>
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
