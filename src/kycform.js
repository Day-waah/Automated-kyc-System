import React from 'react';

function kycform() {
  return (
    <form>
      <label>
        Full Name:
        <input type="text" name="fullName" />
      </label>
      <br />
      <label>
        ID Number:
        <input type="text" name="idNumber" />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default kycform;
