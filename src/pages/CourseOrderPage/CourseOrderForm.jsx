import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';

const CourseOrderForm = ({ register, types, disabled }) => {
  const typeOptions =
    types?.length > 0
      ? [{ value: '', label: '--' }, ...types.map((type) => ({ value: type, label: type }))]
      : [{ value: '', label: '--' }];
  return (
    <div className="itemorder formorder">
      <h3 className="title --t3">Thông tin cá nhân</h3>
      <div className="boxorder">
        <div className="form">
          <div className="form-container">
            <Input label="Họ và tên" required placeholder="Họ và tên" {...register('name')} disabled={disabled} />
            <Input label="Email" required placeholder="Email" disabled {...register('email')} />
          </div>
          <div className="form-container">
            <Input label="Số điện thoại" required placeholder="Số điện thoại" {...register('phone')} disabled={disabled} />
            <Input
              label="Hình thức học"
              required
              disabled={disabled}
              renderInput={(inputProps) => {
                return <Select options={typeOptions} {...inputProps} />;
              }}
              {...register('type')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOrderForm;
