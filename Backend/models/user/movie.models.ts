import { model, Schema, SchemaTypes } from 'mongoose';
import { SCHEMA_CONST } from '../../constants/model.constants';
import { IMovieMongo } from '../../interface/user/movie.interface';

const movieSchema = new Schema<IMovieMongo>(
  {
    name: { type: SchemaTypes.String, required: true },
    year: { type: SchemaTypes.Number, required: true },
    age_rating: { type: SchemaTypes.Number, required: true },
    category: {
      type: [SchemaTypes.String],
      required: true
    },
    description: { type: SchemaTypes.String, required: true },
    image: {
      cover: {
        data: { type: SchemaTypes.String, required: true },
        type: { type: SchemaTypes.String, required: true }
      },
      poster: {
        data: { type: SchemaTypes.String, required: true },
        type: { type: SchemaTypes.String, required: true }
      },
    },
    audio: { type: [SchemaTypes.String], required: false },
    subtitles: { type: [SchemaTypes.String], required: false },
    cast: { type: [SchemaTypes.String], required: false },
    director: { type: [SchemaTypes.String], required: false }
  },
  {
    timestamps: true
  }
);

export const MovieModel = model<IMovieMongo>(SCHEMA_CONST.MOVIES, movieSchema);
