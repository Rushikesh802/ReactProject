import React, { useState, useEffect } from 'react';
import Toast from './Toast';
import './EmployeeForm.css';

const EmployeeForm = ({ employee, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: ''
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
  };

  const validateForm = () => {
    const newErrors = {};
    let hasError = false;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      hasError = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      hasError = true;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      hasError = true;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
      hasError = true;
    }
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
      hasError = true;
    }
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
      hasError = true;
    }

    setErrors(newErrors);
    
    if (hasError) {
      showToast('Please fill all required fields correctly');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      if (!employee) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          department: ''
        });
      }
      showToast('Employee ' + (employee ? 'updated' : 'added') + ' successfully!', 'success');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="employee-form-container">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '' })}
        />
      )}
      <form onSubmit={handleSubmit} className="employee-form">
        <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
        
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={errors.position ? 'error' : ''}
          />
          {errors.position && <span className="error-message">{errors.position}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={errors.department ? 'error' : ''}
          />
          {errors.department && <span className="error-message">{errors.department}</span>}
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {employee ? 'Update' : 'Add'} Employee
          </button>
          {onClose && (
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm; 