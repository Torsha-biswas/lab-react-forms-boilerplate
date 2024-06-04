import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contacts: ''
  });
  
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = 'Please enter your first name!';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Please enter your last name!';
    }

    if (!formData.email) {
      newErrors.email = 'Please enter your email!';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email!';
    }

    if (!formData.contacts) {
      newErrors.contacts = 'Please enter your contact number!';
    } else if (!/^\d{10}$/.test(formData.contacts)) {
      newErrors.contacts = 'Invalid number. It should be exactly 10 digits.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      setSuccessMessage('Registration successful!');
      setErrors({});
    } else {
      setSuccessMessage('');
      setErrors(formErrors);
    }
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Contacts:</label>
          <input
            type="text"
            name="contacts"
            value={formData.contacts}
            onChange={handleChange}
          />
          {errors.contacts && <p className="error">{errors.contacts}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
}

export default App;