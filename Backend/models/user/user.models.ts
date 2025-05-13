import { model, Schema, SchemaTypes } from 'mongoose';
import { IUserMongo } from '../../interface/user/user.interface';
import { SCHEMA_CONST } from '../../constants/model.constants';

const userSchema = new Schema<IUserMongo>(
  {
    name: { type: SchemaTypes.String, required: true },
    email: { type: SchemaTypes.String, required: true },
    password: { type: SchemaTypes.String, required: true },
    phoneNo: { type: SchemaTypes.Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<IUserMongo>(SCHEMA_CONST.USER, userSchema);

