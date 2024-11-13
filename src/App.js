import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleNameChange = (e) => setName(e.target.value);
  const handleDobChange = (e) => setDob(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('dob', dob);

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <div>
      <h1>KYC Verification</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <input type="text" placeholder="Name" onChange={handleNameChange} required />
        <input type="date" placeholder="Date of Birth" onChange={handleDobChange} required />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default App;
