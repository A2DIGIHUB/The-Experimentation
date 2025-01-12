import { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact Us | African and Pregnant',
  description: 'Get in touch with us for support, questions, or collaboration opportunities.',
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div className="contact-layout">{children}</div>;
}
