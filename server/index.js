const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/flashpoint_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Routes
const captureRoute = require('./routes/capture');
const settingsRoute = require('./routes/settings');

app.use('/api/capture', captureRoute);
app.use('/api/settings', settingsRoute);

app.get('/', (req, res) => {
  res.send('FlashPoint Controller is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
