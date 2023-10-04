import React from 'react';
import CallRegister from '../../components/CallRegister';
import AboutHero from './AboutHero';
import AboutStory from './AboutStory';
import AboutBenifit from './AboutBenifit';
import AboutNumbers from './AboutNumbers';
import AboutStudy from './AboutStudy';
import AboutGallery from './AboutGallery';
import AboutTeachers from './AboutTeachers';
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
      <AboutHero />
      <AboutStory />
      <AboutBenifit />
      <AboutNumbers />
      <AboutStudy />
      <AboutGallery galleries={galleryData?.galleries[0]} loading={pageLoading} />
      <AboutTeachers teachers={teamData?.teams} loading={pageLoading} />
      <CallRegister />
    </main>
  );
};

export default AboutPage;
