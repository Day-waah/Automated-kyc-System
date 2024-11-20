// Import necessary modules
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 5000;

// Enable CORS (Cross-Origin Resource Sharing) to allow frontend to communicate with backend
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Set up storage configuration for multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Specify folder to save uploaded files
  },
  filename: (req, file, cb) => {
    // Generate unique file names using the current timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Create the 'uploads' folder if it doesn't exist
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  // Send a success response with file info
  res.send({
    message: 'File uploaded successfully!',
    file: req.file,
  });
});

// Sample route for homepage
app.get('/', (req, res) => {
  res.send('Welcome to the KYC System API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
