import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';
import tokenMethod from '../utils/token';
import { message } from 'antd';
import orderService from '../services/orderService';
import useMutation from '../hooks/useMutation';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [showedModal, setShowedModal] = useState('');
  const [profile, setProfile] = useState({});
  const [myCourses, setMyCourses] = useState([]);
  const [myPayments, setMyPayments] = useState([]);
  const { execute: updateProfile } = useMutation(authService.updateProfile);

  useEffect(() => {
    if (!!tokenMethod.get()) {
      handleGetProfile();
      handleGetMyCourses();
      handleGetMyPayments();
    }
  }, []);

  const handleShowModal = (modalType = '') => {
    setShowedModal(modalType);
  };

  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowedModal('');
  };

  const handleLogout = (e) => {
    tokenMethod.remove();
  };

  const handleGetProfile = async () => {
    if (!!tokenMethod.get()) {
      try {
        const res = await authService.getProfile();
        if (res?.data?.data) {
          setProfile(res.data.data);
        }
      } catch (error) {
        console.error(error);
        handleLogout();
      }
    }
  };

  const handleUpdateProfile = async (formData) => {
    const payload = {
      ...formData,
      lastName: '',
    };
    updateProfile(payload, {
      onSuccess: async () => {
        message.success('Cập nhật thông tin thành công!');
        await handleGetProfile();
      },
      onFail: () => {
        message.error('Cập nhật thông tin thất bại');
      },
    });
  };

  const handleLogin = async (loginData, callback) => {
    const payload = { ...loginData };

    try {
      const res = await authService.login(payload);

      if (res?.data?.data) {
        const { token: accessToken, refreshToken } = res.data.data;
        tokenMethod.set({ accessToken, refreshToken });
        message.success('Đăng nhập thành công');
        handleGetProfile();
        handleGetMyCourses();
        handleGetMyPayments();
      }
    } catch (error) {
      message.error('Đăng nhập thất bại');
      console.error(error);
    } finally {
      callback?.();
    }
  };

  const handleRegister = async (registerData, callback) => {
    const { name: firstName, email, password } = registerData;

    const payload = {
      firstName,
      lastName: '',
      email,
      password,
    };

    try {
      const res = await authService.register(payload);
      if (res?.data?.data?.id) {
        handleLogin({ email, password });
        message.success('Đăng ký thành công');
      }
    } catch (error) {
      message.error('Đăng ký thất bại');
      console.error(error);
    } finally {
      callback?.();
    }
  };

  const handleGetMyCourses = async () => {
    try {
      const res = await orderService.getMyCourses();
      const orderedCourses = res?.data?.data?.orders || [];
      setMyCourses(orderedCourses);
    } catch (error) {
      console.log('getMyCourses error', error);
    }
  };

  const handleGetMyPayments = async () => {
    try {
      const res = await orderService.getMyPayments();
      const payments = res?.data?.data?.orders || [];
      setMyPayments(payments);
    } catch (error) {
      console.log('getMyPayments error', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        showedModal,
        profile,
        myCourses,
        myPayments,
        handleGetProfile,
        handleUpdateProfile,
        handleShowModal,
        handleCloseModal,
        handleLogout,
        handleLogin,
        handleRegister,
        handleGetMyCourses,
        handleGetMyPayments,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
