import express from 'express';
import * as movieController from '../../controller/movies/movie.controller';
import { memoryStorage } from '../../utils/multer.config';

const movieRouter = express.Router();

movieRouter.get('/genre', movieController.getMoviesByGenre);
movieRouter.get('/', movieController.getAllMovies);
movieRouter.post(
  '/',
  memoryStorage.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),
  movieController.createMovie
);

export default movieRouter;
