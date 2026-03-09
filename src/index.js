const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errRoute = require('./routes/error.route');
const rollChange = require('./routes/roleChange.route');
const authRoutes = require('./routes/auth.route');

const app = express();

app.use(cors());
app.use(express.json());

//auth routes
app.use('/api', authRoutes.signIn);
app.use('/api', authRoutes.signUp);
app.use('/api', authRoutes.signOut);

// normal routes
app.use('/api', rollChange);

//error handler route
app.use('/api', errRoute);  

//setup server listener
const port = process.env.PORT;

app.listen( port, ()=>{
    console.log(`App is running at port ${port}`);
});

