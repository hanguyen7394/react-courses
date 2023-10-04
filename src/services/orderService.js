import axiosInstance from '../utils/axiosInstance';

const orderService = {
  orderCourse(payload = {}) {
    return axiosInstance.post('/orders', payload);
  },
  getMyCourses() {
    return axiosInstance.get('/orders/courses/me');
  },
  getMyPayments() {
    return axiosInstance.get('/orders/courses/me');
  },
};

export default orderService;
