"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function StartOlolostep() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState("");
  const [output, setOutput] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleScrape = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setScrapedData("Here is your scraped text...");
      setOutput("Here is your scraped text...");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Side */}
      <div className="w-1/3 flex flex-col items-center justify-center p-8 space-y-4 h-full">
        <div className="mb-14">
          <h1 className="text-6xl font-bold">&lt;Ololostep&gt;</h1>
          <p className="mt-4 text-sm ">ALL INFO YOU NEED. RIGHT ON ONE PAGE.</p>
        </div>
        <p className="text-center">
          Just enter the URL you want to scrape, click send, and you're all set!
        </p>
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
            className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            &#10148;
          </Button>
        </div>
        <div className="flex space-x-2 mt-4">
          <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
        </div>
        <div className="text-2xl mt-4">
          <i className="fab fa-github"></i>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-2/3 flex items-center justify-end pr-4">
        <div className="bg-white dark:bg-gray-800 w-[500px] h-[500px] p-6 rounded-lg shadow-lg border border-gray-300 overflow-auto flex items-center justify-center">
          {isLoading ? (
            <div className="flex space-x-2">
              <div className="loading-dot bg-gray-500 w-2 h-2 rounded-full animate-bounce"></div>
              <div className="loading-dot bg-gray-500 w-2 h-2 rounded-full animate-bounce"></div>
              <div className="loading-dot bg-gray-500 w-2 h-2 rounded-full animate-bounce"></div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              {output || "Scraped text generates here..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
