import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <AnimatedPage>
      <div className="container">
        <h1>Contact</h1>
        <ContactForm />
      </div>
    </AnimatedPage>
  );
}
