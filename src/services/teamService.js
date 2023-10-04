import axiosInstance from '../utils/axiosInstance';

const teamService = {
  getTeams(query = '') {
    return axiosInstance.get(`/teams${query}`);
  },
  getTeamBySlug(slug) {
    return axiosInstance.get(`/teams/${slug}`);
  },
};

export default teamService;
