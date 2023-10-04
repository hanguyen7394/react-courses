import React from 'react';
import ContactForm from './ContactForm';
import ContactSidebar from './ContactSidebar';
import ContactTitle from './ContactTitle';

const ContactPage = () => {
  return (
    <main className="mainwrapper contact --ptop">
      <ContactTitle />

      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <ContactSidebar />
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
