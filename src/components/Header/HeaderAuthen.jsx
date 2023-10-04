import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import tokenMethod from '../../utils/token';
import { Link } from 'react-router-dom';
import { MODAL_TYPES, PATH } from '../../constant/common';

const HeaderAuthen = () => {
  const { profile, handleShowModal, handleLogout } = useAuthContext();
  const [showedDropdown, setShowedDropdown] = useState(false);

  useEffect(() => {
    $(document).on('click.dropdown', () => {
      _hideDropdown();
    });

    return () => {
      $(document).off('click.dropdown');
    };
  }, []);

  const _onClickLogout = (e) => {
    e?.preventDefault();
    handleLogout();
    _hideDropdown();
  };

  const _showDropdown = (e) => {
    e?.stopPropagation();
    setShowedDropdown(true);
  };

  const _hideDropdown = () => {
    setShowedDropdown(false);
  };

  if (!!tokenMethod.get()) {
    const { firstName, profileImage } = profile;

    return (
      <div className="header__logged">
        <div className="userlogged">
          <div className="userlogged__avatar user" onClick={(e) => _showDropdown(e)}>
            <div className="userlogged__avatar-img user__img">
              <img src={profileImage || '/img/cfd-share-thumbnail-facebook.png'} alt="Avatar teacher" />
            </div>
            <i className="userlogged__avatar-icon">
              <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3.5L7.00003 10.5L14 3.5H0Z" fill="white" />
              </svg>
            </i>
          </div>
          <div className={`userlogged__dropdown dropdown ${showedDropdown ? 'active' : ''}`}>
            <div className="userlogged__dropdown-info">
              <div className="user__img">
                <img src={profileImage || '/img/cfd-share-thumbnail-facebook.png'} alt="Avatar teacher" />
              </div>
              <Link to={PATH.PROFILE.INDEX} className="user__info" rel="noreferrer">
                <p className="title --t4">
                  <strong>{firstName || ''}</strong>
                </p>
                <span className="email">Thông tin tài khoản</span>
              </Link>
            </div>
            <div className="userlogged__dropdown-list">
              <Link to={PATH.PROFILE.MY_COURSES}>
                Khóa học của tôi
              </Link>
              <Link to={PATH.PROFILE.MY_PAYMENT}>
                Lịch sử thanh toán
              </Link>
              <Link to={PATH.CONTACT}>
                Hỗ trợ
              </Link>
              <Link onClick={(e) => _onClickLogout(e)}>
                Đăng xuất{' '}
                <i>
                  <img src="/img/iconlogout.svg" />
                </i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="header__auth">
      <div className="btn btn--transparent btnmodal" data-modal="mdlogin">
        <span onClick={() => handleShowModal(MODAL_TYPES.REGISTER)}>Đăng ký /&nbsp;</span>
        <span onClick={() => handleShowModal(MODAL_TYPES.LOGIN)}>Đăng nhập</span>
      </div>
    </div>
  );
};

export default HeaderAuthen;
