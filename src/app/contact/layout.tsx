import { Metadata } from 'next';
import type { ReactNode, ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Contact Us | African and Pregnant',
  description: 'Get in touch with us for support, questions, or collaboration opportunities.',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <section className="contact-layout">
      {children}
    </section>
  );
}
