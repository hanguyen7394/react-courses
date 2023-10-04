import React, { lazy, Suspense } from 'react';
import ComponentLoading from '../../components/ComponentLoading';
const ContactForm = lazy(() => import('./ContactForm'));
const ContactSidebar = lazy(() => import('./ContactSidebar'));
const ContactTitle = lazy(() => import('./ContactTitle'));

const ContactPage = () => {
  return (
    <main className="mainwrapper contact --ptop">
      <Suspense fallback={<ComponentLoading />}>
        <ContactTitle />

        <div className="contact__content">
          <div className="container">
            <div className="wrapper">
              <ContactSidebar />
              <ContactForm />
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  );
};

export default ContactPage;
