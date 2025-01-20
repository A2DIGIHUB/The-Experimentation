'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    // TODO: Implement newsletter signup
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Stay Informed</h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for the latest medical research updates, clinical trial opportunities, and healthcare insights.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              disabled={status === 'loading' || status === 'success'}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                status === 'success'
                  ? 'bg-green-500 text-white'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              {status === 'loading' ? (
                'Subscribing...'
              ) : status === 'success' ? (
                'Subscribed!'
              ) : (
                <>
                  Subscribe
                  <FontAwesomeIcon icon={faPaperPlane} className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>
          {status === 'success' && (
            <p className="mt-4 text-green-600">
              Thank you for subscribing! Check your email for confirmation.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-600">
              There was an error subscribing. Please try again.
            </p>
          )}
          <p className="mt-4 text-sm text-gray-500">
            By subscribing, you agree to receive updates about medical research and healthcare innovations. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
