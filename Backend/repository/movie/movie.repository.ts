import {
  ICreateMovie,
  IGetMovie,
  IGetMovieByGenre,
  IUpdateMovie
} from '../../interface/user/movie.interface';
import { MovieModel } from '../../models/user/movie.models';

export const createMovie = async (data: ICreateMovie) => {
  const movie = new MovieModel(data);
  return await movie.save();
};

export const updateMovie = async (data: IUpdateMovie) => {
  const id = data._id;
  return await MovieModel.updateOne(id, data);
};

export const getMovieByGenre = async (data: IGetMovieByGenre) => {
  return MovieModel.find({
    category: { $in: data.genre }
  });
};

export const getMovie = async (data: IGetMovie) => {
  return await MovieModel.findOne(data._id);
};

export const getAllMovies = async () => {
  return await MovieModel.find();
};
