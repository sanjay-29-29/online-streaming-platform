/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { NextFunction, Request, Response } from 'express';
import * as movieDTO from '../../dtos/movie/movie.dtos';
import * as movieService from '../../service/movie/movie.service';
import fs from 'fs';
import ffMpeg from '../../utils/ffmpeg.utils';

export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const posterData = files['poster'][0];
    const coverData = files['cover'][0];
    const video = files['video'][0];

    if (
      posterData === undefined ||
      coverData === undefined ||
      video === undefined
    ) {
      throw new Error('images are required and video');
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
    const fileExtension = video.originalname.split('.');
    console.log(fileExtension);

    const filePath = `tempStorage/${response?.data._id}.${fileExtension[fileExtension.length - 1]}`;

    fs.writeFile(filePath, video.buffer, async (err) => {
      if (err) throw err;
      const writeResponse = await ffMpeg.generateVideoSegments(
        filePath,
        `storage/${response?.data._id}`
      );
      console.log(`Write Response: ${writeResponse}`);
    });

    if (response) {
      res.status(response.statusCode).send(response);
    } else {
      res.status(500).send({ message: 'Unexpected error occurred' });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await movieService.getAllMovie();
    if (response) {
      res.status(response.statusCode).send(response);
    } else {
      res
        .status(500)
        .send({ message: 'Unexpected error occurred', response: response });
    }
  } catch (err) {
    next(err);
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
