import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StatusPage() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch status from the backend
    const fetchStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/status');
        setStatus(response.data.status);
      } catch (error) {
        setStatus('Error fetching status');
      }
    };

    fetchStatus();
  }, []);

  return (
    <div>
      <h1>Status</h1>
      <p>{status}</p>
    </div>
  );
}

export default StatusPage;
