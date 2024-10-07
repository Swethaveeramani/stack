const Employee = require('../models/Employee');

// Create Employee
const createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course, image } = req.body;
    const newEmployee = new Employee({ name, email, mobile, designation, gender, course, image });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createEmployee, getEmployees, deleteEmployee };
