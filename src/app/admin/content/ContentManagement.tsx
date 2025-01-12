'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Content {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: 'draft' | 'published';
  createdAt: string;
  modifiedAt: string;
  type: 'article' | 'resource' | 'event';
}

export default function ContentManagement() {
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all');
  const [filterType, setFilterType] = useState<'all' | 'article' | 'resource' | 'event'>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'modifiedAt' | 'title'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Form state for creating/editing content
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    type: 'article' as const,
    status: 'draft' as const,
  });

  // Fetch contents on component mount
  const fetchContents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/content');
      if (!response.ok) {
        throw new Error('Failed to fetch contents');
      }
      const data = await response.json();
      setContents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission for creating/editing content
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const url = isEditing ? `/api/admin/content/${selectedContent?.id}` : '/api/admin/content';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} content`);
      }

      // Refresh contents list
      await fetchContents();

      // Reset form
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        type: 'article',
        status: 'draft',
      });
      setIsEditing(false);
      setSelectedContent(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle content deletion
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this content?')) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/content/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete content');
      }

      // Refresh contents list
      await fetchContents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort contents
  const filteredContents = contents
    .filter((content) => {
      const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || content.status === filterStatus;
      const matchesType = filterType === 'all' || content.type === filterType;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      const order = sortOrder === 'asc' ? 1 : -1;
      return aValue < bValue ? -1 * order : aValue > bValue ? 1 * order : 0;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Content Management</h1>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="p-2 border rounded"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="p-2 border rounded"
        >
          <option value="all">All Types</option>
          <option value="article">Article</option>
          <option value="resource">Resource</option>
          <option value="event">Event</option>
        </select>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="p-2 border rounded flex-1"
          >
            <option value="createdAt">Created Date</option>
            <option value="modifiedAt">Modified Date</option>
            <option value="title">Title</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Content Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="mb-8 p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? 'Edit Content' : 'Create New Content'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full p-2 border rounded"
            >
              <option value="article">Article</option>
              <option value="resource">Resource</option>
              <option value="event">Event</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full p-2 border rounded"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-primary-blue text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : isEditing ? 'Update Content' : 'Create Content'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setSelectedContent(null);
                setFormData({
                  title: '',
                  description: '',
                  imageUrl: '',
                  type: 'article',
                  status: 'draft',
                });
              }}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
      </motion.form>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Content List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContents.map((content) => (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={content.imageUrl}
                alt={content.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{content.title}</h3>
                <span className={`px-2 py-1 text-sm rounded ${
                  content.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {content.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{content.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{new Date(content.createdAt).toLocaleDateString()}</span>
                <span>{content.type}</span>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setSelectedContent(content);
                    setIsEditing(true);
                    setFormData({
                      title: content.title,
                      description: content.description,
                      imageUrl: content.imageUrl,
                      type: content.type,
                      status: content.status,
                    });
                  }}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(content.id)}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
