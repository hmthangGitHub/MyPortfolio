const express = require('express');
const app = express();

// Set up a route to handle form submissions
app.post('/forms/contact', (req, res) => {
  // Process the form data here
  // You can access form data using req.body
  // Example: const name = req.body.name;

  // Send a response
  res.send('Form submitted successfully');
});

// Start the server
const port = 3000; // Choose a port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});