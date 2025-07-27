import asyncHandler from "express-async-handler";
import { HttpStatus } from "microutilpkg";
import authService from "../service/authService.js";


const register = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const user = await authService.register({ email, password, role: 'BUYER' });

  res.status(HttpStatus.CREATED).json(user);
});


const login = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const user = await authService.login({ email, password });

  res.status(HttpStatus.OK).json(user);
})



export default {
  register,
  login
}
