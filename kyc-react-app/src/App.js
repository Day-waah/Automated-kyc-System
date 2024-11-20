import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [file, setFile] = useState(null);
  const [kycData, setKycData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle KYC data input change
  const handleKycChange = (e) => {
    const { name, value } = e.target;
    setKycData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload submission
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatusMessage('Please choose a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatusMessage(response.data.message);
    } catch (error) {
      setStatusMessage('Error uploading file.');
    }
  };

  // Handle KYC form submission
  const handleKycSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/submit-kyc', kycData);
      setStatusMessage(response.data.message);
    } catch (error) {
      setStatusMessage('Error submitting KYC data.');
    }
  };

  return (
    <div className="App">
      <h1>Automated KYC System</h1>

      <div className="form-container">
        <h2>Upload Document</h2>
        <form onSubmit={handleFileSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload File</button>
        </form>
      </div>

      <div className="form-container">
        <h2>Submit KYC Information</h2>
        <form onSubmit={handleKycSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={kycData.name}
            onChange={handleKycChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={kycData.address}
            onChange={handleKycChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={kycData.phone}
            onChange={handleKycChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={kycData.email}
            onChange={handleKycChange}
            required
          />
          <button type="submit">Submit KYC</button>
        </form>
      </div>

      <div className="status-message">
        <p>{statusMessage}</p>
      </div>
    </div>
  );
};

export default App;
