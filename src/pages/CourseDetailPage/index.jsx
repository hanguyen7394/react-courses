import React, { useEffect } from 'react';
import CourseDetailHero from './CourseDetailHero';
import CourseDetailContent from './CourseDetailContent';
import Featured from '../../components/Featured';
import Faq from '../../components/Faq';
import CourseDetailList from './CourseDetailList';
import useQuery from '../../hooks/useQuery';
import useDebounce from '../../hooks/useDebounce';
import courseService from '../../services/courseService';
import questionService from '../../services/questionService';
import { useParams } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/common';
import { PATH, ROLE } from '../../constant/common';
import HeaderTop from '../../components/HeaderTop';
import useMutation from '../../hooks/useMutation';

const CourseDetailPage = () => {
  const { courseSlug } = useParams();
  const { data: courseDetail, loading: courseDetailLoading, execute: getCourseDetail } = useMutation(courseService.getCourseBySlug);
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
        <CourseDetailHero {...modifiedProps} />
        <CourseDetailContent {...modifiedProps} />
        <Featured />
        <Faq questions={questionData?.questions} loading={loadingPage} />
        <CourseDetailList courses={courseData?.courses} loading={loadingPage} />
      </main>
    </>
  );
};

export default CourseDetailPage;
