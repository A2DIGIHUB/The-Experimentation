import dynamic from 'next/dynamic';

const ContactWrapper = dynamic(() => import('./ContactWrapper'));

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <ContactWrapper />
    </div>
  );
}
