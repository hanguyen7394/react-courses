import React, { Suspense, lazy, useEffect, useState } from 'react';
const CourseOrderInfo = lazy(() => import('./CourseOrderInfo'));
const CourseOrderForm = lazy(() => import('./CourseOrderForm'));
const CourseOrderPayment = lazy(() => import('./CourseOrderPayment'));
import courseService from '../../services/courseService';
import { useNavigate, useParams } from 'react-router-dom';
import useMutation from '../../hooks/useMutation';
import useDebounce from '../../hooks/useDebounce';
import { formatCurrency } from '../../utils/common';
import { regrexRule, requireRule } from '../../utils/validate';
import useForm from '../../hooks/useForm';
import { useAuthContext } from '../../context/AuthContext';
import Button from '../../components/Button';
import { message } from 'antd';
import orderService from '../../services/orderService';
import { PATH, ROLE } from '../../constant/common';
import ComponentLoading from '../../components/ComponentLoading';

const rules = {
  name: [requireRule('Vui lòng nhập tên')],
  email: [requireRule('Vui lòng nhập email'), regrexRule('email', 'Vui lòng nhập đúng định dạng email')],
  phone: [requireRule('Vui lòng nhập phone'), regrexRule('phone', 'Vui lòng nhập đúng định dạng phone')],
  type: [requireRule('Vui lòng chọn hình thức học')],
};

const CourseOrderPage = () => {
  const navigate = useNavigate();
  const { courseSlug } = useParams();
  const { profile, myCourses, handleGetMyCourses, handleGetMyPayments } = useAuthContext();

  const {
    data: courseData,
    loading: courseLoading,
    execute: courseExecute,
  } = useMutation(() => courseService.getCourseBySlug(courseSlug));

  const { loading: orderedLoading, execute: orderCourse } = useMutation(orderService.orderCourse);
  const orderedDebounce = useDebounce(orderedLoading, 5000); //question

  const [apiIsCalled, setApiIsCalled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const { teams, price, tags } = courseData || [];
  const { firstName: profileName, email: profileEmail, phone: profilePhone } = profile || {};
  const courseOrderProps = {
    ...courseData,
    teacher: teams?.find((member) => member.tags.includes(ROLE.TEACHER)),
    price: formatCurrency(price, 'đ'),
  };
  const {
    id: idOrder,
    name: nameOrder,
    email: emailOrder,
    phone: phoneOrder,
    type: typeOrder,
  } = myCourses?.find((item) => item?.course?.slug === courseSlug) || [];
  const isAlreadyOrder = !!idOrder;

  useEffect(() => {
    courseSlug && courseExecute(courseSlug);
  }, [courseSlug]);

  useEffect(() => {
    setForm({
      name: nameOrder || profileName || '',
      email: emailOrder || profileEmail || '',
      phone: phoneOrder || profilePhone || '',
      type: typeOrder || '',
    });
  }, [profileName, profileEmail, profilePhone, phoneOrder, typeOrder]);

  const { form, register, validate, setForm } = useForm(
    {
      name: '',
      email: '',
      phone: '',
      type: '',
    },
    rules
  );

  const handlePaymentMethodChange = (payment) => {
    setPaymentMethod(payment);
  };

  const _onOrder = () => {
    const profileError = validate();

    if (!Object.keys(profileError).length) {
      if (paymentMethod) {
        setApiIsCalled(true);
        const payload = {
          name: form?.name,
          phone: form?.phone,
          course: courseData?.id,
          type: form.type,
          paymentMethod,
        };

        orderCourse(payload, {
          onSuccess: async () => {
            message.success('Đăng ký thành công!');
            await handleGetMyCourses();
            await handleGetMyPayments();
            navigate(PATH.PROFILE.MY_COURSES);
          },
          onFail: () => {
            message.error('Đăng ký thất bại!');
          },
        });
      } else {
        message.error('Vui lòng chọn hình thức thanh toán');
      }
    }
  };

  return (
    <main className="mainwrapper --ptop">
      <Suspense fallback={<ComponentLoading />}>
        <section className="sccourseorder">
          <div className="container small">
            <CourseOrderInfo {...courseOrderProps} loading={courseLoading} disabled={isAlreadyOrder} />
            <CourseOrderForm register={register} types={tags} disabled={isAlreadyOrder} />
            <CourseOrderPayment
              handleChange={handlePaymentMethodChange}
              selectedPayment={paymentMethod}
              disabled={isAlreadyOrder}
            />

            <Button
              style={{ width: '100%' }}
              onClick={_onOrder}
              loading={apiIsCalled ? orderedDebounce : false}
              disabled={isAlreadyOrder}
            >
              <span>{isAlreadyOrder ? 'Đã đăng ký' : 'Đăng ký khoá học'}</span>
            </Button>
          </div>
        </section>
      </Suspense>
    </main>
  );
};

export default CourseOrderPage;
