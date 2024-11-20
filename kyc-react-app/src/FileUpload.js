import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Assuming you're using the same styles

const FileUpload = () => {
  const [file, setFile] = useState(null); // State to hold the file
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [uploadMessage, setUploadMessage] = useState(''); // State for success messages

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Make a POST request to the backend with the file data
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadMessage(response.data.message); // Display success message
      setErrorMessage(''); // Clear any error message
    } catch (error) {
      setErrorMessage('There was an error uploading the file.');
      setUploadMessage('');
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Your File</h2>

      {/* Display error message if any */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Display success message if any */}
      {uploadMessage && <p className="upload-message">{uploadMessage}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Select File:</label>
          <input type="file" name="file" onChange={handleFileChange} required />
        </div>

        <button type="submit">Upload File</button>
      </form>
    </div>
  );
};

export default FileUpload;
