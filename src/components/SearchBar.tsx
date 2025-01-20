'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      // TODO: Implement actual search functionality
      router.push(`/search?q=${encodeURIComponent(query)}`);
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
          className="w-full bg-white/10 text-white placeholder-white/60 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white focus:outline-none transition-colors"
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
