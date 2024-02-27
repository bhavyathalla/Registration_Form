const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/registration_form',)
  
// Define the user schema
const userSchema = new mongoose.Schema({
  firstname:String,
  lastname:String,
  email: String,
  phone:String,
  password: String,
});

// Specify the 'users' collection
const User = mongoose.model('User', userSchema, 'users');

// Set up middleware for parsing JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Serve the HTML and CSS files
app.use(express.static('public'));

// Handle form submission
app.post('/register', async (req, res) => {
  try {
    console.log('Received data:', req.body);

    const { firstname,  lastname, email, phone, password } = req.body;

    // Basic validation
    if (!firstname || !email || !password) {
      return res.status(400).send('Missing required fields');
    }

    // Save user to the 'users' collection
    const newUser = new User({ firstname, lastname, email, phone, password });
    await newUser.save();

    return res.redirect('Sign.html')
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});