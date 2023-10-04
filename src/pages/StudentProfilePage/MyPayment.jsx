import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useDebounce from '../../hooks/useDebounce';
import SkeletonLoading from '../../components/SkeletonLoading';
import { formatCurrency, formatDate } from '../../utils/common';
import { PAYMENT_METHOD } from '../../constant/common';
import { Empty } from 'antd';

const MyPayment = () => {
  const [loading, setLoading] = useState(true);
  const { myPayments } = useAuthContext();

  useEffect(() => {
    setLoading(false);
  }, [myPayments]);

  const loadingDebounce = useDebounce(loading, 300);

  return (
    <div className="tab__content-item">
      {loadingDebounce && <SkeletonLoading rows={3} />}
      {!!myPayments?.length && (
        <div className={loadingDebounce ? 'is-loading' : 'is-loaded'}>
          {myPayments.map(({ id, paymentMethod, createAt, course }) => {
            return (
              <div key={id} className="itemhistory">
                <div className="name">{course?.name}</div>
                <div className="payment">{PAYMENT_METHOD[paymentMethod]}</div>
                <div className="date">{formatDate(createAt, 'DD-MM-YYYY')}</div>
                <div className="money">{formatCurrency(course?.price, ' VND')}</div>
              </div>
            );
          })}
        </div>
      )}
      {!loadingDebounce && !myPayments?.length && (
        <Empty style={{ margin: '0 auto' }} description="Hiện chưa thanh toán khóa học nào" />
      )}
    </div>
  );
};

export default MyPayment;
