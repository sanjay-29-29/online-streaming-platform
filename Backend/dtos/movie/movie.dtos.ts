import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import { Types } from 'mongoose';
import {
  ICreateMovie,
  IGetMovie,
  IGetMovieByGenre,
  IUpdateMovie
} from '../../interface/user/movie.interface';

// Helper to transform string to ObjectId
function toObjectId(value: string): Types.ObjectId {
  return new Types.ObjectId(value);
}

// Image data (single image)
export class ImageData {
  @Expose()
  @IsNotEmpty({ message: 'data is required' })
  data: string;

  @Expose()
  @IsString({ message: 'type must be a string' })
  @IsNotEmpty({ message: 'type is required' })
  type: string;
}

// Image object (contains cover and poster)
export class ImageObject {
  @Expose()
  @ValidateNested()
  @Type(() => ImageData)
  @IsNotEmpty({ message: 'cover is required' })
  cover: ImageData;

  @Expose()
  @ValidateNested()
  @Type(() => ImageData)
  @IsNotEmpty({ message: 'poster is required' })
  poster: ImageData;
}

// Create movie DTO
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
  @IsString({ message: 'category must be a string' })
  @IsNotEmpty({ message: 'category is required' })
  category: string;

  @Expose()
  @IsString({ message: 'description must be a string' })
  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @Expose()
  @ValidateNested()
  @Type(() => ImageObject)
  @IsNotEmpty({ message: 'image is required' })
  image: ImageObject;

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
  @IsString({ message: 'category must be a string' })
  category?: string;

  @Expose()
  @IsOptional()
  @IsNumber({}, { message: 'year must be a number' })
  @Type(() => Number)
  year?: number;

  @Expose()
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => ImageObject)
  image?: ImageObject;

  @Expose()
  @IsOptional()
  @IsString({ message: 'path must be a string' })
  path?: string;

  @Expose()
  @IsOptional()
  @IsArray({ message: 'artists must be an array' })
  @IsString({ each: true, message: 'each artist must be a string' })
  artists?: string[];

  @Expose()
  @IsOptional()
  @IsArray({ message: 'director must be an array' })
  @IsString({ each: true, message: 'each director must be a string' })
  director?: string[];

  @Expose()
  @IsOptional()
  @IsString({ message: 'file_id must be a string' })
  file_id?: string;

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
  @IsString({ message: 'genre must be a string' })
  @IsNotEmpty({ message: 'genre is required' })
  genre: string;

  constructor(init?: Partial<GetMovieByGenre>) {
    Object.assign(this, init);
  }
}
