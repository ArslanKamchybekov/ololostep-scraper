import React from 'react';
import { Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function ContactUs() {
  const contributors = [
    {
      name: 'Contributor One',
      email: 'contributor1@example.com',
      linkedin: 'https://www.linkedin.com/in/contributor1',
    },
    {
      name: 'Contributor Two',
      email: 'contributor2@example.com',
      linkedin: 'https://www.linkedin.com/in/contributor2',
    },
    {
      name: 'Contributor Three',
      email: 'contributor3@example.com',
      linkedin: 'https://www.linkedin.com/in/contributor3',
    },
    {
      name: 'Contributor Four',
      email: 'contributor4@example.com',
      linkedin: 'https://www.linkedin.com/in/contributor4',
    },
    {
      name: 'Contributor Five',
      email: 'contributor5@example.com',
      linkedin: 'https://www.linkedin.com/in/contributor5',
    },
  ];

  return (
    <div className="text-center mt-12">
      <h1 className="text-3xl font-extrabold">Contact Us</h1>
      <p className="mt-6 text-xl font-semibold">Meet our contributors:</p>
      <div className="mt-6">
        {contributors.map((contributor, index) => (
          <div key={index} className="flex items-center justify-center mb-4">
            <span className="font-bold mr-2">{contributor.name}</span>
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
              className="ml-2"
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
              className="ml-2"
            >
              <LinkedInIcon />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}