import React from 'react';
import './styles.css';  // Include any CSS here
import UploadController from './components/UploadController';  // Import UploadController component

function App() {
  return (
    <div className="App">
      <h1>Automated KYC System</h1>
      <UploadController />
    </div>
  );
}

export default App;
