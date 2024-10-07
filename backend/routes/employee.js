const express = require('express');
const multer = require('multer');
const Employee = require('../models/Employee');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Create Employee
router.post('/create-employee', upload.single('image'), async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  const employee = new Employee({
    name,
    email,
    mobile,
    designation,
    gender,
    course: course.split(','), // Assuming courses are sent as a comma-separated string
    image: req.file ? req.file.path : null,
  });

  try {
    await employee.save();
    res.status(201).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating employee' });
  }
});

// Get Employees
router.get('/employee-list', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching employees' });
  }
});

// Edit Employee
router.put('/edit-employee/:id', upload.single('image'), async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, {
      name,
      email,
      mobile,
      designation,
      gender,
      course: course.split(','),
      image: req.file ? req.file.path : null,
    }, { new: true });

    res.json({ success: true, employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating employee' });
  }
});

// Delete Employee
router.delete('/delete-employee/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting employee' });
  }
});

module.exports = router;
