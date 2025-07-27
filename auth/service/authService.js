import InvalidPasswordException from "../../exception/InvalidPasswordException.js";
import UserAlreadyExistsException from "../../exception/UserAlreadyExistsException.js";
import UserNotFoundException from "../../exception/UserNotFoundException.js";
import UserRepository from "../repository/userRepository.js";
import asyncHandler from "express-async-handler";


const userRepository = new UserRepository();



const register = asyncHandler(async (user) => {

  const existingUser = await userRepository.exists({ email: user.email });

  if (existingUser)
    throw new UserAlreadyExistsException(`User with email ${user.email} already exists`);

  const newUser = await userRepository.create(user);

  return newUser.toJSON();
})

const login = asyncHandler(async (user) => {

  const existingUser = await userRepository.findByEmail(user.email);

  if (!existingUser)
    throw new UserNotFoundException(`User with email ${user.email} not found`);

  const isPasswordMatch = await existingUser.comparePassword(user.password);

  if (!isPasswordMatch)
    throw new InvalidPasswordException('Invalid password');

  return existingUser.toJSON();
})




export default {
  register,
  login
}
