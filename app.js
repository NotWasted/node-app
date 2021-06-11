const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
// const { connectionString } = require('./config/dbConfig')
require('dotenv/config');

// IMPORT ROUTES 
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const kitchenRoutes = require('./routes/kitchenRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

const port = (process.env.PORT || '3000');
app.set('port', port);

// MIDDLEWARE: functions that get executed when a certain route is hit. We initialize one by the use method 
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/kitchen', kitchenRoutes);
app.use('/admin', adminRoutes);
//app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello NotWasted!');
});

mongoose.connect(process.env.DB_CONNECTION_STRING, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }).then(() => {
    console.log("Successfully connected to MongoDB!");
  }).catch(err => {
    console.error('Connection error', err);
    process.exit();
  });

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`)
});
