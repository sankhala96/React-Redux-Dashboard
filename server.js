const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

// BodyParser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDb Connected.."))
  .catch((err) => console.log(err));

// Use Routes
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));