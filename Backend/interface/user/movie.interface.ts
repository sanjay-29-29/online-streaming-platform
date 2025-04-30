import { Types } from 'mongoose';

export interface IMovie {
  name: string;
  description: string;
  year: number;
  poster: string;
  path: string;
  artists: string[];
  director: string[];
  file_id: string;
}

export interface ICreateMovie {
  name: string;
  year: number;
  description: string;
  poster: string;
}

export interface IUpdateMovie {
  name?: string;
  description?: string;
  year?: number;
  poster?: string;
  path?: string;
  artists?: string[];
  director?: string[];
  file_id?: string;
  _id: Types.ObjectId;
}

export interface IGetMovie {
  _id: Types.ObjectId;
}

export interface IMovieMongo extends IMovie, Document {}
