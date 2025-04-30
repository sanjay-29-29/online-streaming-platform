import { Types } from "mongoose";
import { UserModel } from "../../models/user/user.models";

export const getReviewById = async (data : Types.ObjectId) =>{
    return await UserModel.find(data);
}