'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        // TODO: Implement actual search functionality
        // This is a placeholder for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000));
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <p>Please enter a search query.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-4">
        Search Results for "{query}"
      </h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : results.length > 0 ? (
        <div className="grid gap-6">
          {results.map((result, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              {/* Result item content */}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 mb-4">No results found for "{query}"</p>
          <p className="text-gray-500">
            Try adjusting your search terms or browse our categories below.
          </p>
        </div>
      )}
    </div>
  );
}
