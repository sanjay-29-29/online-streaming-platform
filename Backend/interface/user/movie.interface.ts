import { Types } from 'mongoose';

export interface IMovie {
  name: string;
  description: string;
  age_rating: number;
  year: number;
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
  category: string[];
  cast: string[];
  director: string[];
  subtitles: string[];
  audio: string[];
}

export interface ICreateMovie {
  name: string;
  year: number;
  description: string;
  age_rating: number;
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
  cast: string[];
  category: string[];
  director: string[];
  subtitles: string[];
  audio: string[];
}

export interface IUpdateMovie {
  name?: string;
  description?: string;
  year?: number;
  age_rating?: number;
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

  audio?: string[];
  cast?: string[];
  category?: string[];
  director?: string[];
  subtitles?: string[];
  _id: Types.ObjectId;
}

export interface IGetMovie {
  _id: Types.ObjectId;
}

export interface IGetMovieByGenre {
  genre: string[];
}

export interface IMovieMongo extends IMovie, Document { }
