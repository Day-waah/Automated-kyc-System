import React, { useState } from 'react';
import axios from 'axios';

const FileUploadPage = () => {
  const [file, setFile] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission to upload file and trigger OCR
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return alert('Please select a file to upload');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', 'User Name');  // Example field, adjust as necessary
    formData.append('dob', '01-01-1990');  // Example field, adjust as necessary

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming backend returns extracted OCR text
      setOcrResult(response.data.extractedText);
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Upload File for OCR</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Upload and Extract Text'}
        </button>
      </form>

      {ocrResult && (
        <div>
          <h2>OCR Result:</h2>
          <p>{ocrResult}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadPage;
