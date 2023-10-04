import axiosInstance from '../utils/axiosInstance';

const questionService = {
  getQuestions(query = '') {
    return axiosInstance.get(`/questions${query}`);
  },
  getQuestionBySlug(slug) {
    return axiosInstance.get(`/questions/${slug}`);
  },
};

export default questionService;
