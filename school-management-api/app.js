const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes');
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

app.use(express.json());

// Load environment variables
require('dotenv').config();

// Routes
app.use('/api/schools', schoolRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
