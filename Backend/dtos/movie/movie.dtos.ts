import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import {
  ICreateMovie,
  IGetMovie,
  IGetMovieByGenre,
  IUpdateMovie,
} from '../../interface/user/movie.interface';

// Helper to transform string to ObjectId
function toObjectId(value: string): Types.ObjectId {
  return new Types.ObjectId(value);
}

// Create movie DTO
class ImageData {
  @Expose()
  @IsString({ message: 'image data must be a string' })
  @IsNotEmpty({ message: 'image data is required' })
  data: string;

  @Expose()
  @IsString({ message: 'image type must be a string' })
  @IsNotEmpty({ message: 'image type is required' })
  type: string;
}

class Image {
  @Expose()
  @ValidateNested()
  @Type(() => ImageData)
  cover: ImageData;

  @Expose()
  @ValidateNested()
  @Type(() => ImageData)
  poster: ImageData;
}

export class CreateMovie implements ICreateMovie {
  @Expose()
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @Expose()
  @IsNumber({}, { message: 'year must be a number' })
  @IsNotEmpty({ message: 'year is required' })
  @Type(() => Number)
  year: number;

  @Expose()
  @IsNumber({}, { message: 'age_rating must be a number' })
  @IsNotEmpty({ message: 'age_rating is required' })
  @Type(() => Number)
  age_rating: number;

  @Expose()
  @IsString({ message: 'description must be a string' })
  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @Expose()
  @ValidateNested()
  @Type(() => Image)
  image: Image;

  @Expose()
  @IsArray({ message: 'cast must be an array' })
  @IsString({ each: true, message: 'each cast member must be a string' })
  cast: string[];

  @Expose()
  @IsArray({ message: 'category must be an array' })
  @IsString({ each: true, message: 'each category must be a string' })
  category: string[];

  @Expose()
  @IsArray({ message: 'director must be an array' })
  @IsString({ each: true, message: 'each director must be a string' })
  director: string[];

  @Expose()
  @IsArray({ message: 'subtitles must be an array' })
  @IsString({ each: true, message: 'each subtitle language must be a string' })
  subtitles: string[];

  @Expose()
  @IsArray({ message: 'audio must be an array' })
  @IsString({ each: true, message: 'each audio language must be a string' })
  audio: string[];

  constructor(init?: Partial<CreateMovie>) {
    Object.assign(this, init);
  }
}

// Update movie DTO
export class UpdateMovie implements IUpdateMovie {
  @Expose()
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  name?: string;

  @Expose()
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @Expose()
  @IsOptional()
  @IsNumber({}, { message: 'year must be a number' })
  @Type(() => Number)
  year?: number;

  @Expose()
  @IsOptional()
  @IsArray({ message: 'audio must be an array' })
  @IsString({ each: true, message: 'each audio language must be a string' })
  audio?: string[];

  @Expose()
  @IsOptional()
  @IsArray({ message: 'cast must be an array' })
  @IsString({ each: true, message: 'each cast member must be a string' })
  cast?: string[];

  @Expose()
  @IsOptional()
  @IsArray({ message: 'category must be an array' })
  @IsString({ each: true, message: 'each category must be a string' })
  category?: string[];

  @Expose()
  @IsOptional()
  @IsArray({ message: 'director must be an array' })
  @IsString({ each: true, message: 'each director must be a string' })
  director?: string[];

  @Expose()
  @IsOptional()
  @IsArray({ message: 'subtitles must be an array' })
  @IsString({ each: true, message: 'each subtitle language must be a string' })
  subtitles?: string[];

  @Expose()
  @Transform(({ value }) => toObjectId(value))
  @IsNotEmpty({ message: '_id is required' })
  _id: Types.ObjectId;

  constructor(init?: Partial<UpdateMovie>) {
    Object.assign(this, init);
  }
}

// Get movie by ID DTO
export class GetMovie implements IGetMovie {
  @Expose()
  @Transform(({ value }) => toObjectId(value))
  @IsNotEmpty({ message: '_id is required' })
  _id: Types.ObjectId;

  constructor(init?: Partial<GetMovie>) {
    Object.assign(this, init);
  }
}

// Get movie by genre DTO
export class GetMovieByGenre implements IGetMovieByGenre {
  @Expose()
  @IsArray({ message: 'genre must be an array' })
  @IsString({ each: true, message: 'each genre must be a string' })
  @IsNotEmpty({ message: 'genre is required' })
  genre: string[];

  constructor(init?: Partial<GetMovieByGenre>) {
    Object.assign(this, init);
  }
}
