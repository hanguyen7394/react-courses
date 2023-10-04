import axiosInstance from '../utils/axiosInstance';

const galleryService = {
  getGalleries(query = '') {
    return axiosInstance.get(`/galleries${query}`);
  },
  getGalleryBySlug(slug) {
    return axiosInstance.get(`/galleries/${slug}`);
  },
};

export default galleryService;
