'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onClose?: () => void;
  onComplete?: () => void;
}

export default function SearchBar({ onClose, onComplete }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onComplete?.();
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative flex items-center transition-all duration-300 ${
        isFocused ? 'w-64' : 'w-48'
      }`}
    >
      <div className="relative flex-grow">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search articles..."
          className="w-full bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-900 focus:outline-none transition-colors"
          disabled={isSearching}
        >
          <FontAwesomeIcon 
            icon={isSearching ? faSpinner : faSearch} 
            className={`w-4 h-4 ${isSearching ? 'animate-spin' : ''}`}
          />
        </button>
      </div>
    </form>
  );
}
