import { NextFunction, Request, Response } from 'express';
import AuthService from 'services/auth.service';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ user: findUser, login: true, cookie });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
