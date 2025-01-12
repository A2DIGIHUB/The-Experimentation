'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('./ContactForm'), {
  loading: () => <div className="animate-pulse">Loading form...</div>
});

export default function ContactWrapper() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
        Have questions or want to get in touch? Fill out the form below and we'll get back to you as soon as possible.
      </p>
      <div className="max-w-2xl mx-auto">
        <Suspense fallback={<div className="animate-pulse">Loading form...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
