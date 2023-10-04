import React, { Suspense, lazy, useEffect } from 'react';
const CourseDetailHero = lazy(() => import('./CourseDetailHero'));
const CourseDetailContent = lazy(() => import('./CourseDetailContent'));
const Featured = lazy(() => import('../../components/Featured'));
const Faq = lazy(() => import('../../components/Faq'));
const CourseDetailList = lazy(() => import('./CourseDetailList'));
import useQuery from '../../hooks/useQuery';
import useDebounce from '../../hooks/useDebounce';
import courseService from '../../services/courseService';
import questionService from '../../services/questionService';
import { useParams } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/common';
import { PATH, ROLE } from '../../constant/common';
import HeaderTop from '../../components/HeaderTop';
import useMutation from '../../hooks/useMutation';
import ComponentLoading from '../../components/ComponentLoading';

const CourseDetailPage = () => {
  const { courseSlug } = useParams();
  const {
    data: courseDetail,
    loading: courseDetailLoading,
    execute: getCourseDetail,
  } = useMutation(courseService.getCourseBySlug);
  const { data: questionData, loading: questionLoading } = useQuery(questionService.getQuestions);
  const { data: courseData, loading: courseLoading } = useQuery(() => courseService.getCourses('?limit=3'));

  const loadingApi = courseDetailLoading || questionLoading || courseLoading;
  const loadingPage = useDebounce(loadingApi, 300);
  const { teams, price, startDate } = courseDetail || [];

  useEffect(() => {
    courseSlug && getCourseDetail(courseSlug);
  }, [courseSlug]);

  const modifiedProps = {
    ...courseDetail,
    teacher: teams?.find((member) => member.tags.includes(ROLE.TEACHER)),
    price: formatCurrency(price, ' VND'),
    startDate: formatDate(startDate),
    orderPath: `${PATH.COURSE_ORDER.INDEX}/${courseSlug}`,
  };

  return (
    <>
      <HeaderTop {...modifiedProps} />
      <main className="mainwrapper coursedetailpage">
        <Suspense fallback={<ComponentLoading />}>
          <CourseDetailHero {...modifiedProps} />
          <CourseDetailContent {...modifiedProps} />
          <Featured />
          <Faq questions={questionData?.questions} loading={loadingPage} />
          <CourseDetailList courses={courseData?.courses} loading={loadingPage} />
        </Suspense>
      </main>
    </>
  );
};

export default CourseDetailPage;
