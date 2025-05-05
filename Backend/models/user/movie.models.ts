import { model, Schema, SchemaTypes } from 'mongoose';
import { SCHEMA_CONST } from '../../constants/model.constants';
import { IMovieMongo } from '../../interface/user/movie.interface';

const movieSchema = new Schema<IMovieMongo>(
  {
    name: { type: SchemaTypes.String, required: true },
    year: { type: SchemaTypes.Number, required: true },
    category: {
      type: SchemaTypes.String,
      required: true
    },
    description: { type: SchemaTypes.String, required: true },
    images: {
      cover: {
        data: { type: SchemaTypes.String, required: true },
        type: { type: SchemaTypes.String, required: true }
      },
      poster: {
        data: { type: SchemaTypes.String, required: true },
        type: { type: SchemaTypes.String, required: true }
      }
    },
    path: { type: SchemaTypes.String, required: false },
    artists: { type: [SchemaTypes.String], required: false },
    director: { type: [SchemaTypes.String], required: false }
  },
  {
    timestamps: true
  }
);

movieSchema.set('toObject', {
  transform: function (doc, ret) {
    if (ret.images?.cover?.data) {
      ret.images.cover.data = ret.images.cover.data.toString('base64');
    }
    if (ret.images?.poster?.data) {
      ret.images.poster.data = ret.images.poster.data.toString('base64');
    }
    return ret;
  }
});

export const MovieModel = model<IMovieMongo>(SCHEMA_CONST.MOVIES, movieSchema);
