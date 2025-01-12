import type { Metadata } from 'next';
import ContactWrapper from './ContactWrapper';

export const metadata: Metadata = {
  title: 'Contact Us | Health Blog',
  description: 'Get in touch with us for support, questions, or collaboration opportunities.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <ContactWrapper />
    </div>
  );
}
