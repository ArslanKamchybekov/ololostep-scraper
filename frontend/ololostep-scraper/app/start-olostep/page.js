'use client';
import { useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { CircularProgress } from '@mui/material';

export default function StartOlostep() {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [output, setOutput] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleScrape = async () => {
    if (!isSignedIn) {
      setOutput('You need to sign in to use this feature.');
      return;
    }

    setIsLoading(true);

    try {
      const token = await getToken();
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:4000/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setTitle(data.title || 'No title found');
      setDescription(data.description || 'No description found');
      setOutput('Scraped data retrieved successfully.');
    } catch (error) {
      console.error('Error fetching scraped data:', error);
      setOutput('Failed to scrape the URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!isSignedIn) {
      setOutput('You need to sign in to use this feature.');
      return;
    }

    setIsLoading(true);

    try {
      const token = await getToken();
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:4000/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, url }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setOutput(result.message || 'Data saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error);
      setOutput('Failed to save the data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden bg-black text-white">
      {/* Left Side */}
      <div className="w-1/3 flex flex-col items-center justify-center p-8 space-y-4 h-full">
        <div className="mb-14">
          <div className="text-center">
            <h1 className="text-6xl font-bold">OloScraper</h1>
            <p className="mt-10 text-sm font-bold">ALL INFO YOU NEED. RIGHT ON ONE PAGE.</p>
          </div>
        </div>
        <p className="text-center text-gray-300 mb-6">Just enter the URL you want to scrape, click send, and you are all set!</p>
        <div className="flex flex-col items-center">
          <input
            type="text"
            className="w-80 border border-gray-600 rounded-lg p-3 mb-4 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your URL..."
            value={url}
            onChange={handleUrlChange}
          />
          <Button
            onClick={handleScrape}
            className="bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors mb-4"
          >
            Scrape
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors mb-4"
          >
            Save
          </Button>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-2/3 bg-gray-900 p-8 flex flex-col items-center">
        <div className="w-full max-w-xl">
          {isLoading ? (
            <div className="flex justify-center">
              <CircularProgress size={50} className="text-blue-600" />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Scraped Data</h2>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Title</h3>
                <p className="text-lg text-gray-300">{title}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Description</h3>
                <p className="text-lg text-gray-300">{description}</p>
              </div>
              <p className="text-gray-400 mt-6">{output}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
