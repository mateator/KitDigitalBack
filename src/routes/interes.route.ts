import { Router } from 'express';
import { Routes } from 'interfaces/routes.interface';
import InteresController from 'controllers/interes.controller';

class InteresRoute implements Routes {
  public path = '/interes';
  public router = Router();
  public InteresController = new InteresController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.InteresController.getAll);
  }
}

export default InteresRoute;
