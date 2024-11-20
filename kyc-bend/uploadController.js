const fs = require('fs');
const path = require('path');

let status = 'No file uploaded yet'; // Temporary status storage

// Controller to handle file upload
const handleFileUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  // Update status after upload
  status = 'File uploaded successfully';

  res.send({ message: 'File uploaded successfully' });
};

// Controller to fetch status
const getStatus = (req, res) => {
  res.send({ status });
};

module.exports = { handleFileUpload, getStatus };
