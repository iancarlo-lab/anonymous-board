const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const BlogRouter = require('./routes/blogRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('Succesful connection to MongoDB')
});

app.use('/blog', BlogRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Your server is running on port: ${port}`));
