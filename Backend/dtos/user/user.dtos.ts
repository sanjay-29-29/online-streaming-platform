import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  ICreateUser,
  IGetUser,
  IUpdateUser,
  IUserIdentity
} from '../../interface/user/user.interface';
import { Expose, Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';

const toObjectId = (value: string | Types.ObjectId): Types.ObjectId => {
  return Types.ObjectId.isValid(value)
    ? new Types.ObjectId(value)
    : new Types.ObjectId();
};

export class UserIdentityDTO implements IUserIdentity{
  @Expose()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email must be required' })
  email: string;

  @Expose()
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must be required' })
  password: string;

  constructor(init?: Partial<UserIdentityDTO>) {
    Object.assign(this, init);
  }
}

export class CreateUserDTO implements ICreateUser {
  @Expose()
  @IsString({ message: 'Name must be String' })
  @IsNotEmpty({ message: 'Name must be required' })
  name: string;

  @Expose()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email must be required' })
  email: string;

  @Expose()
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must be required' })
  password: string;

  @Expose()
  @Type(() => Number)
  @IsNumber({}, { message: 'Phone number must be a number' })
  @IsNotEmpty({ message: 'Phone Number required' })
  phoneNo: number;

  constructor(init?: Partial<CreateUserDTO>) {
    Object.assign(this, init);
  }
}

export class UpdateUserDTO implements IUpdateUser {
  @Expose()
  @IsString({ message: 'Name must be String' })
  name?: string | undefined;

  @Expose()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string | undefined;

  @Expose()
  @Type(() => Number)
  @IsNumber({}, { message: 'Phone number must be a number' })
  phoneNo?: number | undefined;

  @Expose()
  @Transform(({ value }) => toObjectId(value))
  _id: Types.ObjectId;

  constructor(init?: Partial<UpdateUserDTO>) {
    Object.assign(this, init);
  }
}

export class GetUserDTO implements IGetUser {
  @Expose()
  @Transform(({ value }) => toObjectId(value))
  _id: Types.ObjectId;

  constructor(init?: Partial<GetUserDTO>) {
    Object.assign(this, init);
  }
}
