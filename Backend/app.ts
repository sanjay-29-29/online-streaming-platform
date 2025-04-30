import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.static('public'));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api',routes);

export default app;

