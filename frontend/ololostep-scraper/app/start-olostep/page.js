'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CircularProgress } from '@mui/material';
import { useTheme } from 'next-themes';
import { useUser } from '@clerk/nextjs'; // Use Clerk's hook

export default function StartOlostep() {
  const { theme } = useTheme();
  const [clientTheme, setClientTheme] = useState(theme);
  const [originalButtonColor, setOriginalButtonColor] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  console.log("User Object:", user); // Use Clerk's user object
  const [scrapedData, setScrapedData] = useState("");
  const [output, setOutput] = useState("");
  const [buttonColor, setButtonColor] = useState(theme === "light" ? "bg-gray-600" : "bg-white");

  useEffect(() => {
    setClientTheme(theme);
    setOriginalButtonColor(theme === "light" ? "bg-gray-600" : "bg-white");
    setButtonColor(theme === "light" ? "bg-gray-600" : "bg-white");
  }, [theme]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleScrape = async () => {
    const { user } = useUser();
    const sessionToken = user?.session?.id;
  
    if (!sessionToken) {
      console.error("User is not authenticated or no valid session token found");
      setOutput("Please log in to use this feature.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:4000/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ url }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      setScrapedData(data);
      setOutput(data.extractedText || "No text found.");
    } catch (error) {
      console.error("Error fetching scraped data:", error);
      setOutput("Failed to scrape the URL. Please try again.");
    } finally {
      setIsLoading(false);
      setButtonColor(originalButtonColor);
    }
  };
  
  return (
    <div className={`flex h-screen w-full overflow-hidden ${clientTheme}`}>
      {/* Left Side */}
      <div className="w-1/3 flex flex-col items-center justify-center p-8 space-y-4 h-full">
        <div className="mb-14">
          <div className="text-center">
            <h1 className="text-6xl font-bold" style={{ textShadow: clientTheme === "dark" ? "0 0 10px white" : "0 0 10px rgba(0, 0, 0, 0.7)" }}>
              Olostep.
            </h1>
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
            className={`${buttonColor} text-black p-2 rounded-full hover:bg-gray-300 transition-colors`}
          >
            &#10148;
          </Button>
        </div>
        <div className="text-2xl mt-4">
          <i className="fab fa-github"></i>
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
              <p className="text-gray-500 text-center">{output || "Scraped text generates here..."}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
