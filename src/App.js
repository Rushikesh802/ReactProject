import React, { useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const handleAddEmployee = (employeeData) => {
    if (editingEmployee) {
      setEmployees(employees.map(emp =>
        emp.id === editingEmployee.id ? { ...employeeData, id: emp.id } : emp
      ));
    } else {
      setEmployees([...employees, { ...employeeData, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setEmployeeToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setEmployees(employees.filter(emp => emp.id !== employeeToDelete));
    setShowDeleteConfirm(false);
    setEmployeeToDelete(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Employee Management System</h1>
        <button
          className="add-employee-btn"
          onClick={() => {
            setEditingEmployee(null);
            setShowForm(true);
          }}
        >
          Add Employee
        </button>
      </header>

      <main className="app-main">
        <EmployeeList
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <EmployeeForm
              employee={editingEmployee}
              onSubmit={handleAddEmployee}
              onClose={() => {
                setShowForm(false);
                setEditingEmployee(null);
              }}
            />
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content delete-confirm">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this employee?</p>
            <div className="modal-buttons">
              <button
                className="confirm-delete-btn"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setEmployeeToDelete(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
