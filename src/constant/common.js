export const REGREX = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  url: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
};

export const PATH = {
  HOME: '/',
  ABOUT: '/about',
  BLOG: {
    INDEX: '/blogs',
    DETAIL: '/blogs/:blogSlug',
    CATEGORY: '/blogs/:categoryId',
  },
  COURSE: {
    INDEX: '/courses',
    DETAIL: '/courses/:courseSlug',
  },
  COURSE_ORDER: {
    INDEX: '/course-order',
    DETAIL: '/course-order/:courseSlug',
  },
  PAYMENT_METHOD: 'payment-method',
  PRIVACY: '/privacy',
  CONTACT: '/contact',
  PROFILE: {
    INDEX: '/profile',
    MY_COURSES: '/profile/my-courses',
    MY_PAYMENT: '/profile/my-payment',
  },
};

export const STORAGE = {
  TOKEN: 'token',
};

export const MODAL_TYPES = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export const PAYMENT_METHOD = {
  atm: 'Chuyển khoản',
  momo: 'Ví điện tử MoMo',
  cash: 'Tiền mặt',
};

export const ROLE = {
  TEACHER: 'Teacher',
  MENTOR: 'Mentor',
};
