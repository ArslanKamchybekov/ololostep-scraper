import React from 'react';
import { Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function ContactUs() {
  const contributors = [
    {
      name: 'Hafiza Minahil Shabbir',
      email: 'hafizaminahil105@gmail.com',
      linkedin: 'https://www.linkedin.com/in/minahil-shabbir-0857b726b/',
    },
    {
      name: 'Arslan Kamchybekov',
      email: 'kamchybekov.arslan.us@gmail.com',
      linkedin: 'https://www.linkedin.com/in/arslankamchybekov/',
    },
    {
      name: 'Ebuka Onyejesi',
      email: 'chiebukaonyejesi@gmail.com',
      linkedin: 'https://www.linkedin.com/in/chiebuka-onyejesi/',
    },
    {
      name: 'Gayanthika Shankar',
      email: 'gayanthika23shankar@gmail.com',
      linkedin: 'https://www.linkedin.com/in/gayanthikashankar/',
    },
  ];

  return (
    <div className="text-center mt-12">
      <h1 className="text-3xl font-extrabold" style={{ textShadow: '0 0 10px white, 0 0 10px black' }}>Contact Us</h1>
      <p className="mt-6 text-xl font-semibold">Meet our contributors:</p>
      <div className="mt-6">
        {contributors.map((contributor, index) => (
          <div key={index} className="flex flex-col items-center mb-4">
            <span className="font-bold">{contributor.name}</span>
            <div className="flex mt-2">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#6a1b9a',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#8e24aa',
                  },
                }}
                href={`mailto:${contributor.email}`}
                target="_blank"
                className="mr-2"
              >
                <EmailIcon />
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#6a1b9a',
                  color: '#6a1b9a',
                  '&:hover': {
                    backgroundColor: '#f3e5f5',
                  },
                }}
                href={contributor.linkedin}
                target="_blank"
              >
                <LinkedInIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}