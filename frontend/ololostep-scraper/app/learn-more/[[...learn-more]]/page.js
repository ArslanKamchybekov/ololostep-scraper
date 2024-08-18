import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function LearnMore() {
  return (
    <div className="text-center mt-12">
      <h1 className="text-3xl font-extrabold">Learn More About Olostep Scraper!</h1>
      <p className="mt-4">Our web app allows users to enter a link and then scrapes and displays the content of the scrape to them.</p>
      <p className="mt-4">You can view this project on GitHub:</p>
      <a href="https://github.com/ArslanKamchybekov/ololostep-scraper" target="_blank" rel="noopener noreferrer">
        <GitHubIcon className="w-150 h-15 inline-block mt-2 ml-2" />
      </a>
    </div>
  );
}