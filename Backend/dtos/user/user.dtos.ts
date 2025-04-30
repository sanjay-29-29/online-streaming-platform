// import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
// import { ICreateUser } from "../../interface/user/user.interface";
// import { Expose } from "class-transformer";

// class CreateUserDTO implements ICreateUser{
//     @Expose()
//     @IsString({ message : "Name must be String"})
//     @IsNotEmpty({ message : "Name must be required"})
//     name: string;
    
//     @Expose()
//     @IsEmail()
//     @IsNotEmpty({message:"Email must be Required"})
//     email: string;

//     @Expose()
//     @IsNotEmpty({message:"Password must be required"})
//     password: string;

//     @Expose()
//     @IsNumber()
//     @IsNotEmpty({message:"Phone Number required"})
//     phoneNo: number;

//     constructor(init?: Partial<CreateUserDTO>) {
//         Object.assign(this, init);
//       }
// }