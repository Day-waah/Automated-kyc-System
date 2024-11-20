const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded!' });
  }
  res.status(200).json({ message: 'File uploaded successfully!' });
});

// KYC submission route
app.post('/submit-kyc', (req, res) => {
  const { name, address, phone, email } = req.body;

  if (!name || !address || !phone || !email) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  res.status(200).json({ message: 'KYC data submitted successfully!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
