import React from 'react';
import useQuery from '../../hooks/useQuery';
import courseService from '../../services/courseService';
import useDebounce from '../../hooks/useDebounce';
import SkeletonLoading from '../../components/SkeletonLoading';
import CourseItem from '../../components/CourseItem';

const CoursesPage = () => {
  const { data, loading } = useQuery(courseService.getCourses);
  const loadingDebounce = useDebounce(loading, 300);

  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
          </div>
        </div>

        {loadingDebounce && <SkeletonLoading columns={2} />}
        {!!data?.courses?.length && (
          <div className={`courses__list ${loadingDebounce ? 'is-loading' : 'is-loaded'}`}>
            {data.courses.map((course) => {
              return <CourseItem key={course.id} {...course} />;
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default CoursesPage;
