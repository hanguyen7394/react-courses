import React, { lazy, Suspense } from 'react';
import ComponentLoading from '../../components/ComponentLoading';
const CallRegister = lazy(() => import('../../components/CallRegister'));
const AboutHero = lazy(() => import('./AboutHero'));
const AboutStory = lazy(() => import('./AboutStory'));
const AboutBenifit = lazy(() => import('./AboutBenifit'));
const AboutNumbers = lazy(() => import('./AboutNumbers'));
const AboutStudy = lazy(() => import('./AboutStudy'));
const AboutGallery = lazy(() => import('./AboutGallery'));
const AboutTeachers = lazy(() => import('./AboutTeachers'));
import useQuery from '../../hooks/useQuery';
import useDebounce from '../../hooks/useDebounce';
import teamService from '../../services/teamService';
import galleryService from '../../services/galleryService';

const AboutPage = () => {
  const { data: teamData, loading: teamLoading } = useQuery(teamService.getTeams);
  const { data: galleryData, loading: galleryLoading } = useQuery(galleryService.getGalleries);

  const apiLoading = teamLoading || galleryLoading;
  const pageLoading = useDebounce(apiLoading, 300);

  return (
    <main className="mainwrapper aboutpage">
      <Suspense fallback={<ComponentLoading />}>
        <AboutHero />
        <AboutStory />
        <AboutBenifit />
        <AboutNumbers />
        <AboutStudy />
        <AboutGallery galleries={galleryData?.galleries[0]} loading={pageLoading} />
        <AboutTeachers teachers={teamData?.teams} loading={pageLoading} />
        <CallRegister />
      </Suspense>
    </main>
  );
};

export default AboutPage;
