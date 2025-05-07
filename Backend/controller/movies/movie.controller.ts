/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { NextFunction, Request, Response } from 'express';
import * as movieDTO from '../../dtos/movie/movie.dtos';
import * as movieService from '../../service/movie/movie.service';
import fs from 'fs';
import path from 'path'
import { ObjectId } from 'mongodb';


export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } || {};

    const posterData = files['poster']?.[0];
    const coverData = files['cover']?.[0];
    const videoData = files['video']?.[0];

    if (!posterData || !coverData) {
      throw new Error("Poster and cover images are required");
    }

    const body = req.body;

    const category = body.category ? body.category.split(',').map((item: string) => item.trim()) : [];
    const director = body.director ? body.director.split(',').map((item: string) => item.trim()) : [];
    const cast = body.cast ? body.cast.split(',').map((item: string) => item.trim()) : [];
    const audio = body.audio ? body.audio.split(',').map((item: string) => item.trim()) : [];
    const subtitles = body.subtitles ? body.subtitles.split(',').map((item: string) => item.trim()) : [];

    const dto = new movieDTO.CreateMovie({
      name: body.name,
      year: body.year,
      category,
      director,
      cast,
      audio,
      age_rating: body.age_rating,
      subtitles,
      description: body.description,
      image: {
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

    if (videoData && response?.data?._id) {
      const fileExtension = videoData.originalname.split('.').pop();
      const filePath = `storage/${response.data._id}.${fileExtension}`;
      fs.writeFile(filePath, videoData.buffer, (err) => {
        if (err) {
          console.error('Error saving video file:', err);
        }
      });
    }

    if (response) {
      res.status(response.statusCode).send(response);
    } else {
      res.status(500).send({ message: 'Unexpected error occurred' });
    }
  } catch (error) {
    console.error('Error in createMovie:', error);
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

export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.params.id;
    const dto = new movieDTO.GetMovie({ _id: new ObjectId(data) });
    const response = await movieService.getMovieById(dto);
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
}

export const fetchMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    console.log(id);
    const videoPath = path.join('storage', `${id}.mp4`);
    const range = req.headers.range;
    if (!range) {
      return res.status(400).send('Requires Range header');
    }

    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 1 * 1e6; // 1MB chunks

    // Extract start byte and validate it
    const start = Number(range.replace(/\D/g, ''));
    if (start >= videoSize) {
      return res.status(416).send('Range Not Satisfiable');
    }

    // Ensure end is within bounds and >= start
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  } catch (err) {
    next(err);
  }
};


