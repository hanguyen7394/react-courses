import React from 'react';
import CourseItem from '../../components/CourseItem';
import SkeletonLoading from '../../components/SkeletonLoading';

const CourseDetailList = ({ courses = [], loading = true }) => {
  return (
    <section className="courses">
      <div className="container">
        <div className="heading --center --noline">
          <h2 className="heading__title title --t2">Khoá học đề xuất</h2>
        </div>
        {loading && <SkeletonLoading columns={3} />}
        {!!courses?.length && (
          <div className={`courses__list ${loading ? 'is-loading' : 'is-loaded'}`}>
            {courses.map((course) => {
              return <CourseItem key={course.id} {...course} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseDetailList;
