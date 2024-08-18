import React from 'react';
import { Button } from '@mui/material';

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
      <p className="mt-6">Meet our contributors:</p>
      <div className="mt-6">
        {contributors.map((contributor, index) => (
          <div key={index} className="mb-4">
            <span className="font-bold">{contributor.name}</span>
            <Button
              variant="contained"
              color="primary"
              href={`mailto:${contributor.email}`}
              className="ml-2"
            >
              Email
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              href={contributor.linkedin}
              className="ml-2"
            >
              LinkedIn
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}