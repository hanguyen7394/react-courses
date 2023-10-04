import axiosInstance from '../utils/axiosInstance';

const rateService = {
  getRates(query = '') {
    return axiosInstance.get(`/rates${query}`);
  },
  getRateBySlug(slug) {
    return axiosInstance.get(`/rates/${slug}`);
  },
};

export default rateService;
