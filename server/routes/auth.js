const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  console.log('Registration request received:', req.body);
  try {
    const { name, email, password } = req.body;
    console.log('Extracted data:', { name, email, password: password ? '******' : undefined });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    try {
      console.log('Creating new user with name:', name, 'and email:', email);
      const user = new User({ name, email, password });
      await user.save();
      console.log('User saved successfully with ID:', user._id);

      // Generate token
      console.log('Generating JWT token with secret:', process.env.JWT_SECRET ? 'Secret exists' : 'No secret found');
      console.log('JWT_SECRET value:', process.env.JWT_SECRET);
      console.log('JWT_EXPIRES_IN value:', process.env.JWT_EXPIRES_IN);

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      console.log('Token generated successfully');

      res.status(201).json({ token });
    } catch (innerError) {
      console.error('Error during user creation or token generation:', innerError);
      throw innerError; // Re-throw to be caught by the outer try-catch
    }
  } catch (error) {
    console.error('Registration failed with error:', error);
    console.error('Error stack:', error.stack);

    // Provide more specific error messages
    let errorMessage = 'Registration failed';

    if (error.name === 'ValidationError') {
      // Handle mongoose validation errors
      const validationErrors = Object.values(error.errors).map(err => err.message);
      errorMessage = validationErrors.join('. ');
    } else if (error.code === 11000) {
      // Handle duplicate key errors (e.g., email already exists)
      errorMessage = 'Email already registered';
    } else {
      errorMessage = error.message;
    }

    res.status(400).json({ message: errorMessage, error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
});

module.exports = router;