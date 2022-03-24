import { Router } from 'express';
import { Routes } from 'interfaces/routes.interface';
import validationMiddleware from 'middlewares/validation.middleware';
import { SolicitudInteresDTO } from 'dtos/solicitudInteres.dto';
import SolicitudInteresController from 'controllers/solicitudInteres.controller';

class SolicitudInteresRoute implements Routes {
  public path = '/solicitudInteres/';
  public router = Router();
  public solicitudInteresController = new SolicitudInteresController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}create`, validationMiddleware(SolicitudInteresDTO, 'body'), this.solicitudInteresController.create);
    this.router.post(`${this.path}edit`, this.solicitudInteresController.update);
    this.router.post(`${this.path}delete`, validationMiddleware(SolicitudInteresDTO, 'body'), this.solicitudInteresController.delete);
  }
}

export default SolicitudInteresRoute;
