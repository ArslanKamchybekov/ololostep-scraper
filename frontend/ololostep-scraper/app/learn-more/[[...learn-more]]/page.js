import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function LearnMore() {
  return (
    <div className="text-center mt-12">
      <h1 className="text-3xl font-extrabold" style={{ textShadow: '0 0 10px white, 0 0 10px black' }}>Learn More About Olostep Scraper!</h1>
      <p className="mt-4">Also known as OloScrap, our web app is designed to make web scraping easy and efficient. Users can simply enter a link, and our app will automatically scrape the content and display it in a user-friendly format. This feature is especially useful for those who need to gather data from various websites for research, analysis, or any other purpose.</p>
      <p className="mt-4">You can view this project on GitHub:</p>
      <a href="https://github.com/ArslanKamchybekov/ololostep-scraper" target="_blank" rel="noopener noreferrer">
        <GitHubIcon className="w-150 h-15 inline-block mt-2 ml-2" />
      </a>
    </div>
  );
}