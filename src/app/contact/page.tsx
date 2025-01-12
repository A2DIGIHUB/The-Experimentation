'use client';

import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('./ContactForm'), {
  loading: () => <div>Loading...</div>
});

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Have questions or want to get in touch? Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
