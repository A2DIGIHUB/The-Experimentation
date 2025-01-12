import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Contact Us | African and Pregnant',
  description: 'Get in touch with us for support, questions, or collaboration opportunities.',
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <section className="contact-layout">
      {children}
    </section>
  );
}
