import React from 'react';
import Featured from '../../components/Featured';
import CallRegister from '../../components/CallRegister';
import Faq from '../../components/Faq';
import HomeCourses from './HomeCourses';
import HomeHero from './HomeHero';
import HomeCourseComing from './HomeCourseComing';
import HomeTeacher from './HomeTeacher';
import HomeGallery from './HomeGallery';
import HomeTestimonial from './HomeTestimonial';
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
    <main className="mainwrapper" style={{position: 'relative'}}>
      <HomeHero />

      <HomeCourseComing courses={comingCourses} loading={pageLoading} />

      <HomeCourses courses={courseData?.courses} loading={pageLoading} />

      <HomeTeacher teachers={teamData?.teams} loading={pageLoading} />

      <Featured />

      <HomeTestimonial rates={rateData?.rates} loading={pageLoading} />

      <Faq questions={questionData?.questions} loading={pageLoading} />

      <HomeGallery galleries={galleryData?.galleries[0]} loading={pageLoading} />

      <CallRegister />
    </main>
  );
};

export default Home;
