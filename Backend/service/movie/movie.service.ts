import {
  ICreateMovie,
  IGetMovie,
  IGetMovieByGenre
} from '../../interface/user/movie.interface';
import * as movieRepository from '../../repository/movie/movie.repository';
import { GeneralResponse } from '../../utils/response';

export const handleCreateMovie = async (data: ICreateMovie) => {
  try {
    const res = await movieRepository.createMovie(data);
    return new GeneralResponse(true, res, 200, 'movie created successfully');
  } catch (error) {
    console.log(error);
  }
};

export const getMovieByGenre = async (data: IGetMovieByGenre) => {
  try {
    const res = await movieRepository.getMovieByGenre(data);
    return new GeneralResponse(true, res, 200, 'fetched data successfully');
  } catch (error) {
    console.log(error);
  }
};

export const getMovieById = async (data: IGetMovie) => {
  try {
    const res = await movieRepository.getMovie(data);
    return new GeneralResponse(true, res, 200, 'fetched data successfully');
  } catch (error) {
    console.log(error);
  }
};


export const getAllMovie = async () => {
  try {
    const res = await movieRepository.getAllMovies();
    return new GeneralResponse(true, res, 200, 'fetched data successfully');
  } catch (error) {
    console.log(error);
  }
};
