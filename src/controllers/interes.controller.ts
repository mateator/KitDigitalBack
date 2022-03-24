import { NextFunction, Request, Response } from 'express';
import interesService from 'services/interes.service';

class InteresController {
  public solicitudService = new interesService();

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const interesResponseData = await this.solicitudService.getAll();

      res.status(201).json(interesResponseData);
    } catch (error) {
      next(error);
    }
  };
}

export default InteresController;
