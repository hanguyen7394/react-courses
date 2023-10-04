import React, { lazy, Suspense } from 'react';
import ComponentLoading from '../../components/ComponentLoading';
const Featured = lazy(() => import('../../components/Featured'));
const CallRegister = lazy(() => import('../../components/CallRegister'));
const Faq = lazy(() => import('../../components/Faq'));
const HomeCourses = lazy(() => import('./HomeCourses'));
const HomeHero = lazy(() => import('./HomeHero'));
const HomeCourseComing = lazy(() => import('./HomeCourseComing'));
const HomeTeacher = lazy(() => import('./HomeTeacher'));
const HomeGallery = lazy(() => import('./HomeGallery'));
const HomeTestimonial = lazy(() => import('./HomeTestimonial'));
import useQuery from '../../hooks/useQuery';
import useDebounce from '../../hooks/useDebounce';
import courseService from '../../services/courseService';
import teamService from '../../services/teamService';
import galleryService from '../../services/galleryService';
import questionService from '../../services/questionService';
import rateService from '../../services/rateService';

const Home = () => {
  const { data: courseData, loading: courseLoading } = useQuery(courseService.getCourses);
  const { data: teamData, loading: teamLoading } = useQuery(teamService.getTeams);
  const { data: galleryData, loading: galleryLoading } = useQuery(galleryService.getGalleries);
  const { data: questionData, loading: questionLoading } = useQuery(questionService.getQuestions);
  const { data: rateData, loading: rateLoading } = useQuery(rateService.getRates);
  const comingCourses = courseData?.courses.filter((course) => {
    return new Date(course?.startDate) > new Date();
  });

  const apiLoading = courseLoading || teamLoading || galleryLoading || questionLoading || rateLoading;
  const pageLoading = useDebounce(apiLoading, 300);

  return (
    <main className="mainwrapper">
      <Suspense fallback={<ComponentLoading />}>
        <HomeHero />

        <HomeCourseComing courses={comingCourses} loading={pageLoading} />

        <HomeCourses courses={courseData?.courses} loading={pageLoading} />

        <HomeTeacher teachers={teamData?.teams} loading={pageLoading} />

        <Featured />

        <HomeTestimonial rates={rateData?.rates} loading={pageLoading} />

        <Faq questions={questionData?.questions} loading={pageLoading} />

        <HomeGallery galleries={galleryData?.galleries[0]} loading={pageLoading} />

        <CallRegister />
      </Suspense>
    </main>
  );
};

export default Home;
