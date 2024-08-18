'use client'
import React, { useState, useEffect } from 'react'
import { useUser, useSession } from '@clerk/nextjs';

const ScrapedPage = () => {
    const { user } = useUser();
    const { session } = useSession();
    const [scrapedData, setScrapedData] = useState([]);

    useEffect(() => {
        const fetchScrapedData = async () => {
            try {
                if (session) {
                    const token = await session.getToken();
                    const sessionId = session.id;

                    const response = await fetch('http://localhost:4000/api/data', {
                        headers: {
                            Authorization: `Bearer ${token}`, 
                            'X-Session-Id': sessionId, 
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setScrapedData(data); 
                    } else {
                        console.error('Failed to fetch scraped data:', response.statusText);
                    }
                }
            } catch (error) {
                console.error('Error fetching scraped data:', error);
            }
        };

        fetchScrapedData();
    }, [session]);

    return (
        <div>
            <h1>Your Scraped Data</h1>
            {scrapedData.length === 0 ? (
                <p>No scraped data found.</p>
            ) : (
                <ul>
                    {scrapedData.map((data) => (
                        <li key={data._id}>
                            <h3>{data.title}</h3>
                            <p>{data.description}</p>
                            <p><strong>URL:</strong> {data.url}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ScrapedPage;
