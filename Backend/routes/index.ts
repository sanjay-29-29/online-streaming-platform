import express from 'express';
import userRouter from './user/user.routes';
import movieRouter from './movies/movies.routes';
import { ROUTE_CONSTANTS } from '../constants/routers.constants';

const router = express.Router();

router.use(ROUTE_CONSTANTS.USER, userRouter);
router.use(ROUTE_CONSTANTS.MOVIE, movieRouter);

export default router;

