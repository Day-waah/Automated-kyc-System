import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

const HomePage = () => {
  // States for KYC form and file upload
  const [kycData, setKycData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKycData({
      ...kycData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic KYC validation
    if (!kycData.name || !kycData.address || !kycData.phone || !kycData.email) {
      setErrorMessage('All KYC fields must be filled out.');
      return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    formData.append('name', kycData.name);
    formData.append('address', kycData.address);
    formData.append('phone', kycData.phone);
    formData.append('email', kycData.email);
    if (file) {
      formData.append('file', file);
    }

    try {
      // Send KYC data and file to the backend
      const response = await axios.post('http://localhost:5000/submit-kyc', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('There was an error submitting the KYC data.');
      setUploadMessage('');
    }
  };

  return (
    <div className="homepage-container">
      <h1>Submit Your KYC</h1>

      {/* Error Message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Success Message */}
      {uploadMessage && <p className="upload-message">{uploadMessage}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={kycData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={kycData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={kycData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={kycData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Upload Document:</label>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>

        <button type="submit">Submit KYC</button>
      </form>
    </div>
  );
};

export default HomePage;
