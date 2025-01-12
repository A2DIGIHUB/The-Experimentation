import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

const ContentManagement = dynamic(() => import('./ContentManagement'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const metadata: Metadata = {
  title: 'Content Management | Admin Dashboard',
  description: 'Manage your blog content, resources, and events.',
};

export default function AdminContentPage() {
  return (
    <div className="min-h-screen">
      <ContentManagement />
    </div>
  );
}
