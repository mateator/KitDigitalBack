import { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'class-validator';
import { HttpException } from 'exceptions/HttpException';
import SolicitudInteresService from 'services/solicitudInteres.service';
import { SolicitudInteresDTO } from 'dtos/solicitudInteres.dto';

class SolicitudInteresController {
  public solicitudInteresService = new SolicitudInteresService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const solicitudInteresData: SolicitudInteresDTO = req.body;
      const createSolicitudInteresResponse = await this.solicitudInteresService.create(solicitudInteresData);

      res.status(201).json({ data: createSolicitudInteresResponse, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (isEmpty(req.body)) throw new HttpException(400, 'Error al eliminar campo, no se han recibido datos');

    try {
      const solicitudInteresData = req.body;
      await this.solicitudInteresService.delete(solicitudInteresData);

      res.status(201).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const solicitudInteresData: SolicitudInteresDTO = req.body;
      await this.solicitudInteresService.update(solicitudInteresData);

      res.status(201).json({ message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default SolicitudInteresController;
