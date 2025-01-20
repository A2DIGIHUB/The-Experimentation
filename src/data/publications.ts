export interface Publication {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

export const publications: Publication[] = [
  {
    id: '1',
    title: 'Understanding Maternal Health in Africa',
    excerpt: 'A comprehensive study on maternal health challenges and solutions in African communities.',
    image: '/images/publications/maternal-health.jpg',
    category: 'Research',
    date: '2025-01-15',
    author: 'Dr. Sarah Johnson'
  },
  {
    id: '2',
    title: 'Nutrition During Pregnancy',
    excerpt: 'Essential guide to maintaining proper nutrition during pregnancy in resource-limited settings.',
    image: '/images/publications/nutrition.jpg',
    category: 'Health Guide',
    date: '2025-01-10',
    author: 'Dr. Michael Chen'
  },
  {
    id: '3',
    title: 'Traditional Birth Practices',
    excerpt: 'Exploring the intersection of traditional and modern birthing practices in African healthcare.',
    image: '/images/publications/traditional-birth.jpg',
    category: 'Cultural Studies',
    date: '2025-01-05',
    author: 'Prof. Amina Diallo'
  },
  {
    id: '4',
    title: 'Mental Health During Pregnancy',
    excerpt: 'Addressing mental health concerns and support systems for pregnant women in Africa.',
    image: '/images/publications/mental-health.jpg',
    category: 'Mental Health',
    date: '2024-12-28',
    author: 'Dr. Lisa Williams'
  }
];
