require('dotenv').config({ path: './config.env' });
const express = require('express');
const AuthRoutes = require('./routes/auth');
const private = require('./routes/private');
const app = express();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
// Connect with DataBase

connectDB();

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use('/api/auth', AuthRoutes);
app.use('/api/private', private);

app.use(errorHandler);
const server = app.listen(PORT, () =>
  console.log(`Server is listing on port ${PORT}`)
);

app.get('/', (req, res) => res.status(200).send('You are in right shape'));
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
