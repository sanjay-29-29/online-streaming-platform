import express from 'express';
import cors from 'cors';
import movieRouter from './routes/movies/movies.routes';

const app = express();

app.use(cors());

app.use('/', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/movies', movieRouter);
// app.use('/api', routes);
export default app;
