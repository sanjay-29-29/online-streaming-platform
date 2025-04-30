import { model, Schema, SchemaTypes } from 'mongoose';
import { SCHEMA_CONST } from '../../constants/model.constants';
import { IMovieMongo } from '../../interface/user/movie.interface';

const movieSchema = new Schema<IMovieMongo>(
  {
    name: { type: SchemaTypes.String, required: true },
    year: { type: SchemaTypes.Number, required: true },
    description: { type: SchemaTypes.String, required: true },
    poster: { type: SchemaTypes.String, required: true },
  },
  {
    timestamps: true,
  },
);

export const MovieModel = model<IMovieMongo>(SCHEMA_CONST.MOVIE, movieSchema);
