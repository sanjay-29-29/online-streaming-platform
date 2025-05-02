import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO, UpdateUserDTO } from '../../dtos/user/user.dtos';
import { handleCreateUser } from '../../service/user/user.service';


// export const loginUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
 
// }

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDTO = new CreateUserDTO(req.body);
    const response = await handleCreateUser(userDTO);
    if (response) {
      res.status(response.statusCode).send(response);
    } else {
      res.status(500).send({ message: 'Unexpected error occurred' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDTO = new UpdateUserDTO(req.body);
    console.log(userDTO);
    // const response = await handleCreateUser(userDTO);
    // res.status(response.statusCode).send(response);
  } catch (error) {
    next(error);
  }
};

