import { Types } from "mongoose";

export interface IUser{
    name: string;
    email: string;
    password: string;
    phoneNo: number;
    createAt: Date;
    updateAt: Date;
}

export interface IUserIdentity{
    email: string;
    password: string;
}

export interface ICreateUser{
    name: string;
    email: string;
    password: string;
    phoneNo: number;
}
export interface IUpdateUser{
    name?: string;
    email?: string;
    password?: string;
    phoneNo?: number;
    _id: Types.ObjectId
}

export interface IGetUser{
    _id: Types.ObjectId;
}

export interface IUserMongo extends IUser, Document{}
