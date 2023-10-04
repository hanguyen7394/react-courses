import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogDetailPage from './pages/BlogDetailPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CourseOrderPage from './pages/CourseOrderPage';
import CoursesPage from './pages/CoursesPage';
import PaymentMethodPage from './pages/PaymentMethodPage.jsx';
import PrivacyPage from './pages/PrivacyPage';
import StudentProfilePage from './pages/StudentProfilePage';
import MyCourses from './pages/StudentProfilePage/MyCourses';
import MyInfo from './pages/StudentProfilePage/MyInfo';
import MyPayment from './pages/StudentProfilePage/MyPayment';
import Page404 from './pages/Page404';
import { PATH } from './constant/common';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATH.ABOUT} element={<AboutPage />} />
          <Route path={PATH.BLOG.INDEX} element={<BlogPage />} />
          <Route path={PATH.BLOG.DETAIL} element={<BlogDetailPage />} />
          <Route path={PATH.CONTACT} element={<ContactPage />} />
          <Route path={PATH.COURSE.INDEX} element={<CoursesPage />} />
          <Route path={PATH.COURSE.DETAIL} element={<CourseDetailPage />} />
          <Route path={PATH.PAYMENT_METHOD} element={<PaymentMethodPage />} />
          <Route path={PATH.PRIVACY} element={<PrivacyPage />} />
          <Route element={<PrivateRoute />}>
            <Route path={PATH.COURSE_ORDER.DETAIL} element={<CourseOrderPage />} />
            <Route path={PATH.PROFILE.INDEX} element={<StudentProfilePage />}>
              <Route index element={<MyInfo />} />
              <Route path={PATH.PROFILE.MY_COURSES} element={<MyCourses />} />
              <Route path={PATH.PROFILE.MY_PAYMENT} element={<MyPayment />} />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
