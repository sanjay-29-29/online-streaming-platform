import { ICreateUser } from "../../interface/user/user.interface";
import { createUser } from "../../repository/user/user.repository";
import { GeneralResponse } from "../../utils/response";

export const handleCreateUser = async(data: ICreateUser) => {
    try{
        const response = await createUser(data);
        return new GeneralResponse(
            true,response, 200, "User Created Successfully"
        )
    }catch(err){
        console.log(err);   
    }
}
