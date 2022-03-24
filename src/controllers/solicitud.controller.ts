import { NextFunction, Request, Response } from 'express';
import { SolicitudDTO } from 'dtos/solicitud.dto';
import SolicitudService from 'services/solicitud.service';
import { isEmpty } from 'class-validator';
import { HttpException } from 'exceptions/HttpException';

class SolicitudController {
  public solicitudService = new SolicitudService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const solicitudData: SolicitudDTO = req.body;
      console.log(req.body);

      const createSolicitudResponse: SolicitudDTO = await this.solicitudService.create(solicitudData);

      res.status(201).json({ data: createSolicitudResponse, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (isEmpty(req.body.id)) throw new HttpException(400, 'Error al eliminar campo');

    try {
      const solicitudId = req.body.id;
      const createSolicitudResponse = await this.solicitudService.delete(solicitudId);

      res.status(201).json({ data: createSolicitudResponse, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const solicitudId: Number = parseInt(req.params.id);
      delete req.body.interes;
      const solicitudData: SolicitudDTO = req.body;
      const createSolicitudResponse = await this.solicitudService.update(solicitudId, solicitudData);

      res.status(201).json({ data: createSolicitudResponse, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public readWithFilter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const solicitudData = req.body;
      const createSolicitudResponse = await this.solicitudService.readWithFilter(solicitudData);

      res.status(201).json(createSolicitudResponse);
    } catch (error) {
      next(error);
    }
  };
}

export default SolicitudController;
