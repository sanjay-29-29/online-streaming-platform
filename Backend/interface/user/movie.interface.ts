import { Types } from 'mongoose';

export interface IMovie {
  name: string;
  category: string;
  description: string;
  year: number;
  path: string;
  artists: string[];
  director: string[];
  file_id: string;
  image: {
    cover: {
      data: string;
      type: string;
    };
    poster: {
      data: string;
      type: string;
    };
  };
}

export interface ICreateMovie {
  name: string;
  year: number;
  category: string;
  description: string;
  image: {
    cover: {
      data: string;
      type: string;
    };
    poster: {
      data: string;
      type: string;
    };
  };
}

export interface IUpdateMovie {
  name?: string;
  description?: string;
  year?: number;
  image?: {
    cover?: {
      data: string;
      type: string;
    };
    poster?: {
      data: string;
      type: string;
    };
  };
  path?: string;
  artists?: string[];
  director?: string[];
  file_id?: string;
  _id: Types.ObjectId;
}

export interface IGetMovie {
  _id: Types.ObjectId;
}

export interface IGetMovieByGenre {
  genre: string;
}

export interface IMovieMongo extends IMovie, Document {}
