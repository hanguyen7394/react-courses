import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PATH } from './constant/common';
import { Suspense, lazy } from 'react';
const ComponentLoading = lazy(() => import('./components/ComponentLoading/index.jsx'));
const MainLayout = lazy(() => import('./layout/MainLayout'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'));
const CourseOrderPage = lazy(() => import('./pages/CourseOrderPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const PaymentMethodPage = lazy(() => import('./pages/PaymentMethodPage.jsx'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const StudentProfilePage = lazy(() => import('./pages/StudentProfilePage'));
const MyCourses = lazy(() => import('./pages/StudentProfilePage/MyCourses'));
const MyInfo = lazy(() => import('./pages/StudentProfilePage/MyInfo'));
const MyPayment = lazy(() => import('./pages/StudentProfilePage/MyPayment'));
const Page404 = lazy(() => import('./pages/Page404'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));

function App() {
  return (
    <Suspense fallback={<ComponentLoading style={{ height: '100vh' }} />}>
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
    </Suspense>
  );
}

export default App;
