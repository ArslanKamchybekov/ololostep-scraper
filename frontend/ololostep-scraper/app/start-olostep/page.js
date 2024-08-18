"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CircularProgress } from '@mui/material'; // Import CircularProgress from Material UI
import { useTheme } from 'next-themes'; // Import useTheme

export default function StartOlostep() {
  const { theme } = useTheme(); // Get the current theme
  const [clientTheme, setClientTheme] = useState(theme); // Add clientTheme state
  const [originalButtonColor, setOriginalButtonColor] = useState(""); // Initialize as empty

  useEffect(() => {
    setClientTheme(theme); // Update clientTheme on theme change
    setOriginalButtonColor(theme === 'light' ? "bg-gray-600" : "bg-white"); // Set original button color after mount
  }, [theme]);

  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState("");
  const [output, setOutput] = useState("");
  const [buttonColor, setButtonColor] = useState(theme === 'light' ? "bg-gray-600" : "bg-white"); // Initialize buttonColor based on theme

  useEffect(() => {
    setButtonColor(theme === 'light' ? "bg-gray-600" : "bg-white"); // Update buttonColor on theme change
  }, [theme]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleScrape = async () => {
    setIsLoading(true);
    setButtonColor(theme === 'dark' ? "bg-green-500" : "bg-green-500");

    setTimeout(() => {
      setScrapedData("Here is your scraped text...");
      setOutput("Here is your scraped text...");
      setIsLoading(false);
      setButtonColor(originalButtonColor); // Change back to original button color
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleScrape(); // Call the existing handleScrape function
  };

  return (
    <form onSubmit={handleSubmit}> {/* Add form element and onSubmit handler */}
      <div className={`flex h-screen w-full overflow-hidden ${clientTheme}`}> {/* Use clientTheme */}
        {/* Left Side */}
        <div className="w-1/3 flex flex-col items-center justify-center p-8 space-y-4 h-full">
          <div className="mb-14">
            <div className="text-center"> {/* Centering the content */}
              <h1 className="text-6xl font-bold" style={{ textShadow: clientTheme === 'dark' ? '0 0 10px white' : '0 0 10px rgba(0, 0, 0, 0.7)' }}>Olostep.</h1>
              <p className="mt-10 text-sm  font-bold">ALL INFO YOU NEED. RIGHT ON ONE PAGE.</p>
            </div>
          </div>
          <p className="text-center">
            Just enter the URL you want to scrape, click send, and you're all set!
          </p>
          <div className="flex items-center space-x-2" >
            <input
              type="text"
              className="w-64 border border-gray-300 rounded-full p-2"
              placeholder="Enter your URL..."
              value={url}
              onChange={handleUrlChange}
            />
            <Button
              type="submit" // Change button type to submit
              className={`${buttonColor} text-black p-2 rounded-full hover:bg-gray-300 transition-colors`} // Use updated buttonColor
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
                <p className="text-gray-500 text-center">
                  {output || "Scraped text generates here..."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}