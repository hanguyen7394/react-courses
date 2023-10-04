import React, { useEffect } from 'react';
import CourseItem from '../../components/CourseItem';
import { Empty } from 'antd';
import SkeletonLoading from '../../components/SkeletonLoading';

const HomeCourseComing = ({ courses = [], loading = true }) => {
  useEffect(() => {
    let courseComingSlider = $('#coursecoming__slider');
    courseComingSlider.flickity({
      cellAlign: 'left',
      contain: true,
      prevNextButtons: false,
      pageDots: false,
      dragThreshold: 0,
      wrapAround: true,
    });

    $('.coursecoming .control .control__next').on('click', function (e) {
      e.preventDefault();
      courseComingSlider.flickity('next');
    });
    $('.coursecoming .control .control__prev').on('click', function (e) {
      e.preventDefault();
      courseComingSlider.flickity('previous');
    });
  }, [courses]);

  return (
    <section className="coursecoming --scpadding" style={{ position: 'relative' }}>
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Khoá học <span className="color--primary">sắp khai giảng</span>
          </h2>
          <div className="control">
            <div className="control__prev">
              <img src="/img/icon-btn-control.svg" alt="icon prev" />
            </div>
            <div className="control__next">
              <img src="/img/icon-btn-control.svg" alt="icon next" />
            </div>
          </div>
        </div>
      </div>
      {loading && <SkeletonLoading />}
      {!loading && !!courses?.length && (
        <div className="coursecoming__list" id="coursecoming__slider">
          {courses.map((course) => (
            <CourseItem key={course.id} {...course} type="coming" />
          ))}
        </div>
      )}
      {!loading && !courses?.length && (
        <Empty description="Không tìm thấy khóa học nào" />
      )}
    </section>
  );
};

export default HomeCourseComing;
