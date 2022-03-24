import { Router } from 'express';
import { Routes } from 'interfaces/routes.interface';
import DelegacionController from 'controllers/delegacion.controller';

class DelegacionRoute implements Routes {
  public path = '/delegacion';
  public router = Router();
  public delegacionController = new DelegacionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.delegacionController.getAll);
  }
}

export default DelegacionRoute;
