import { ICreateUser, IGetUser, IUpdateUser } from "../../interface/user/user.interface";
import { UserModel } from "../../models/user/user.models";

export const createUser = async(
    data : ICreateUser
) => {
    const user = new UserModel(data);
    return await user.save();
}

export const updateUser = async (data : IUpdateUser)=>{
    const id = data._id;
    return await UserModel.updateOne(id, data);
}

export const getUser = async (data : IGetUser) => {
    return await UserModel.find(data._id);
}