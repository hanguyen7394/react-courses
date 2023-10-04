import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Empty } from 'antd';
import CourseItem from '../../components/CourseItem';
import SkeletonLoading from '../../components/SkeletonLoading';
import useDebounce from '../../hooks/useDebounce';

const MyCourses = () => {
  const [loading, setLoading] = useState(true);
  const { myCourses } = useAuthContext();

  useEffect(() => {
    setLoading(false);
  }, [myCourses]);

  const loadingDebounce = useDebounce(loading, 300);

  return (
    <div className="tab__content-item">
      {loadingDebounce && <SkeletonLoading columns={2} />}
      {!!myCourses?.length && (
        <div className={`courses__list ${loadingDebounce ? 'is-loading' : 'is-loaded'}`}>
          {myCourses.map(({ course = {} }) => {
            return <CourseItem key={course.id} {...course} />;
          })}
        </div>
      )}
      {!loadingDebounce && !myCourses?.length && (
        <Empty style={{ margin: '0 auto' }} description="Hiện chưa đăng ký khóa học nào" />
      )}
    </div>
  );
};

export default MyCourses;
