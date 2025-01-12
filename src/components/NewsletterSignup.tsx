'use client';

import { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // TODO: Implement newsletter signup API integration
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
      <p className="text-gray-600 mb-6">
        Get the latest health insights and updates delivered to your inbox
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      {status === 'success' && (
        <p className="text-green-600 mt-4">Thank you for subscribing!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 mt-4">Something went wrong. Please try again.</p>
      )}
    </div>
  );
};

export default NewsletterSignup;
