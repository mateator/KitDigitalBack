import { Router } from 'express';
import { Routes } from 'interfaces/routes.interface';
import SolicitudController from 'controllers/solicitud.controller';

class SolicitudRoute implements Routes {
  public path = '/solicitud/';
  public router = Router();
  public solicitudController = new SolicitudController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.solicitudController.readWithFilter);
    this.router.post(`${this.path}create`, this.solicitudController.create);
    this.router.post(`${this.path}delete`, this.solicitudController.delete);
    this.router.put(`${this.path}:id(\\d+)/edit`, this.solicitudController.update);
  }
}

export default SolicitudRoute;
