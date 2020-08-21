const express = require('express');
const mongoose = require('mongoose');
const bodyPareser = require('body-parser');

const app = express();

// BodyParser Middleware
app.use(bodyPareser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDb Connected..'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));