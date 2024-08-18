'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { CircularProgress } from '@mui/material';
import { useAuth } from '@clerk/nextjs';

const ScrapedPage = () => {
  const { user, isSignedIn } = useUser();
  const [scrapedData, setScrapedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { getToken } = useAuth();

  useEffect(() => {
        const fetchData = async () => {
        try {
            const token = await getToken();
            const response = await fetch('http://localhost:4000/api/my-data', {
                headers: {
                'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setScrapedData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
      };
      fetchData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">My Scraped Data</h1>
      <div className="space-y-4">
        {scrapedData.length > 0 ? (
          scrapedData.map((item) => (
            <div key={item._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-2">{item.description}</p>
              <a
                href={item.url}
                className="mt-2 block text-blue-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            </div>
          ))
        ) : (
          <p className="text-center">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default ScrapedPage;
