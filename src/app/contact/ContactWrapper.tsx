'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const LoadingSpinner = () => (
  <div className="animate-pulse p-8 rounded-lg bg-gray-50">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

const ContactForm = dynamic(() => import('./ContactForm'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

export default function ContactWrapper() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
        Have questions or want to get in touch? Fill out the form below and we'll get back to you as soon as possible.
      </p>
      <div className="max-w-2xl mx-auto">
        <Suspense fallback={<LoadingSpinner />}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
