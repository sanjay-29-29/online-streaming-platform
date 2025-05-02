/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { NextFunction, Request, Response } from 'express';
import * as movieDTO from '../../dtos/movie/movie.dtos';
import * as movieService from '../../service/movie/movie.service';

export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const posterData = files['poster'][0];
    const coverData = files['cover'][0];

    if (posterData === undefined || coverData === undefined) {
      throw new Error('images are required');
    }

    const dto = new movieDTO.CreateMovie({
      ...req.body,
      images: {
        poster: {
          data: posterData.buffer.toString('base64'),
          type: posterData.mimetype
        },
        cover: {
          data: coverData.buffer.toString('base64'),
          type: coverData.mimetype
        }
      }
    });

    const response = await movieService.handleCreateMovie(dto);
    if (response) {
      res.status(response.statusCode).send(response);
    } else {
      res.status(500).send({ message: 'Unexpected error occurred' });
    }
  } catch (error) {
    next(error);
  }
};

export const getMoviesByGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dto = new movieDTO.GetMovieByGenre(req.body);
    const response = await movieService.getMovieByGenre(dto);
    if (response) {
      res.status(response.statusCode).send(response);
    } else {
      res
        .status(500)
        .send({ message: 'Unexpected error occurred', response: response });
    }
  } catch (error) {
    next(error);
  }
};
