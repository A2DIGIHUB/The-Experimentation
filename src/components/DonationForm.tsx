'use client';

import { useState } from 'react';

const donationAmounts = [25, 50, 100, 250, 500];

export default function DonationForm() {
  const [amount, setAmount] = useState<number | string>('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isRecurring, setIsRecurring] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with payment processor (Stripe/PayPal)
    console.log('Processing donation:', { amount, paymentMethod, isRecurring });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Donation Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Donation Amount
          </label>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {donationAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(amt)}
                className={`py-2 px-4 rounded-lg border ${
                  amount === amt
                    ? 'border-primary-blue bg-primary-blue text-white'
                    : 'border-gray-300 hover:border-primary-blue'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Other amount"
              className="pl-8 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
            />
          </div>
        </div>

        {/* Donation Frequency */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="rounded text-primary-blue focus:ring-primary-blue"
            />
            <span className="text-sm text-gray-700">Make this a monthly donation</span>
          </label>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-4 border rounded-lg flex items-center justify-center ${
                paymentMethod === 'card'
                  ? 'border-primary-blue bg-blue-50'
                  : 'border-gray-300'
              }`}
            >
              <span className="mr-2">💳</span> Credit Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`p-4 border rounded-lg flex items-center justify-center ${
                paymentMethod === 'paypal'
                  ? 'border-primary-blue bg-blue-50'
                  : 'border-gray-300'
              }`}
            >
              <span className="mr-2">🅿️</span> PayPal
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full btn-primary py-3 text-lg font-semibold"
        >
          Donate ${amount} {isRecurring && 'Monthly'}
        </button>

        {/* Security Notice */}
        <p className="text-sm text-gray-500 text-center">
          🔒 Your donation is secure. We use industry-standard encryption to protect your information.
        </p>
      </form>
    </div>
  );
}
