import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const authData = new AuthDTO(email, password);

  const response = await authService.register(authData);
  res.status(response.status === 'success' ? 201 : 500).json(response);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const authData = new AuthDTO(email, password);

  const response = await authService.login(authData);
  res.status(response.status === 'success' ? 200 : 400).json(response);
};
