import React from 'react';
import CourseItem from '../../components/CourseItem';
import { Empty } from 'antd';
import SkeletonLoading from '../../components/SkeletonLoading';
import { PATH } from '../../constant/common';
import { Link } from 'react-router-dom';

const HomeCourses = ({ courses, loading = true }) => {
  return (
    <section className="courses">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Tất cả <span className="color--primary">khóa học</span>
          </h2>
        </div>

        <div className="courses__list">
          {loading && <SkeletonLoading columns={2} />}

          {!loading && !!courses?.length && (
            courses.map((course) => <CourseItem key={course.id} {...course} />)
          )}

          {!loading && !courses?.length && (
            <Empty description="Không tìm thấy khóa học nào" />
          )}
        </div>

        <div className="courses__btnall">
          <Link to={PATH.COURSE.INDEX} className="course__btn btn btn--grey">
            Tất cả khoá học
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeCourses;
