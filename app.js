import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';//index file in the route folder
import usersRouter from './routes/users.js';
import funFactsRouter from './routes/funfacts.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import moonRouter from './routes/moon.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//Any request to /api/moon/... will go to MongoDB backend route
app.use('/api', indexRouter);//route of the request that we will receive
//we want to send the request is equal to slash /api
//when we receive request starting with /api we want to go to indexrouter
app.use('/api/funfacts', funFactsRouter);
app.use('/api/moon', moonRouter);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
