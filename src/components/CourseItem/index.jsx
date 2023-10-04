import React from 'react';
import { formatCurrency, formatDate } from '../../utils/common';
import Button from '../Button';
import { PATH, ROLE } from '../../constant/common';
import { Link } from 'react-router-dom';

const CourseItem = ({ type = 'normal', price, title, image, teams, slug, startDate, tags }) => {
  const detailPath = `${PATH.COURSE.INDEX}/${slug}`;
  const orderPath = `${PATH.COURSE_ORDER.INDEX}/${slug}`;
  const teacher = teams?.find((member) => member.tags.includes(ROLE.TEACHER));

  if (type === 'normal') {
    return (
      <div className="courses__list-item">
        <div className="img">
          <Link to={detailPath}>
            <img src={image} alt={title} className="course__thumbnail" />
            <span className="course__img-badge badge">{tags.join(' | ')}</span>
          </Link>
        </div>
        <div className="content">
          <p className="label">Khóa học</p>
          <h3 className="title --t3">
            <Link to={detailPath}>{title}</Link>
          </h3>
          <div className="content__info">
            {teacher.id && (
              <div className="user">
                <div className="user__img">
                  <img src={teacher.image} alt={teacher.name} />
                </div>
                <p className="user__name">{teacher.name}</p>
              </div>
            )}
            {price && (
              <div className="price">
                <strong>{formatCurrency(price)}</strong>
              </div>
            )}
          </div>
          <div className="content__action">
            <Button link={orderPath} className="btn btn--primary">
              Đăng Ký Học
            </Button>
            <Button link={detailPath} className="btn btn--default">
              <img src="/img/icon-paper.svg" alt="icon paper" />
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (type === 'coming') {
    return (
      <div className="coursecoming__item">
        <div className="coursecoming__item-img">
          <Link to={detailPath}>
            <img src={image} alt={title} />
          </Link>
        </div>
        <div className="coursecoming__item-content">
          <p className="category label">Front-end</p>
          <h2 className="title --t2">
            <Link to={detailPath}>{title}</Link>
          </h2>
          {teacher.id && (
            <div className="user">
              <div className="user__img">
                <img src={teacher.image} alt={teacher.name} />
              </div>
              <p className="user__name">{teacher.name}</p>
            </div>
          )}
          <div className="info">
            {startDate && (
              <div className="labeltext">
                <span className="label --blue">Ngày khai giảng</span>
                <p className="title --t2">{formatDate(startDate)}</p>
              </div>
            )}
            {tags && (
              <div className="labeltext">
                <span className="label --blue">Hình thức học</span>
                <p className="title --t2">{tags.join(' | ')}</p>
              </div>
            )}
          </div>
          <div className="btnwrap">
            <Button link={orderPath} className="btn btn--primary">
              Đăng Ký Học
            </Button>
            <Button link={detailPath} className="btn btn--border --black">
              Xem chi tiết
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default CourseItem;
