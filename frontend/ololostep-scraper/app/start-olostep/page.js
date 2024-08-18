'use client';
import { useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { CircularProgress } from '@mui/material';

export default function StartOlostep() {
  const { user, isSignedIn } = useUser(); // Use the hook here
  const { getToken } = useAuth(); // Get token method from useAuth
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState('');
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
      const token = await getToken(); // Retrieve token from Clerk
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:4000/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
        body: JSON.stringify({ url }), // Send the URL to scrape
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setScrapedData(data);
      setOutput(data.extractedText || 'No text found.'); // Update the output with scraped data
    } catch (error) {
      console.error('Error fetching scraped data:', error);
      setOutput('Failed to scrape the URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Side */}
      <div className="w-1/3 flex flex-col items-center justify-center p-8 space-y-4 h-full">
        <div className="mb-14">
          <div className="text-center">
            <h1 className="text-6xl font-bold">OloScraper</h1>
            <p className="mt-10 text-sm font-bold">ALL INFO YOU NEED. RIGHT ON ONE PAGE.</p>
          </div>
        </div>
        <p className="text-center">Just enter the URL you want to scrape, click send, and you're all set!</p>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="w-64 border border-gray-300 rounded-full p-2"
            placeholder="Enter your URL..."
            value={url}
            onChange={handleUrlChange}
          />
          <Button
            onClick={handleScrape}
            className="bg-gray-600 text-black p-2 rounded-full hover:bg-gray-300 transition-colors"
          >
            &#10148;
          </Button>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-2/3 flex items-center justify-end pr-4">
        <div className="bg-white dark:bg-gray-800 w-[500px] h-[500px] p-6 rounded-lg shadow-lg border border-gray-300 overflow-auto flex items-center justify-center">
          <div className="max-h-full overflow-auto">
            {isLoading ? (
              <div className="flex justify-center">
                <CircularProgress size={24} />
              </div>
            ) : (
              <p className="text-gray-500 text-center">{output || 'Scraped text generates here...'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
