const express = require('express');
const cors = require('cors');
require('dotenv').config();
const rollChange = require('./routes/roleChange.route');
const authRoutes = require('./routes/auth.route');
const errorMiddleware = require('./middlewares/error.middleware');
const httpLogger = require('./middlewares/httpLogger.middleware');
const helmet = require('./middlewares/helmetSecurity.middleware');
const rateLimiter = require('./middlewares/helmetSecurity.middleware'); 

const app = express();

//security middlewares
app.use(cors());
app.use(helmet);

app.use(express.json());

//logger
app.use(httpLogger);

//limiter
app.use(rateLimiter);

//auth routes
app.use('/api', authRoutes.signIn);
app.use('/api', authRoutes.signUp);
app.use('/api', authRoutes.signOut);

// normal routes
app.use('/api', rollChange);

//error handler middleware
app.use(errorMiddleware);  

//setup server listener
const port = process.env.PORT;

app.listen( port, ()=>{
    console.log(`App is running at port ${port}`);
});

