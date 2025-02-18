import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Contact Us | African and Pregnant',
  description: 'Get in touch with us for support, questions, or collaboration opportunities.',
};

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return (
    <section className="contact-layout">
      {props.children}
    </section>
  );
}
