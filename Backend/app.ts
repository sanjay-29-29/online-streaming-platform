import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import path from 'path';

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);
app.use('/api', express.static(path.join(__dirname, 'storage')));

export default app;
