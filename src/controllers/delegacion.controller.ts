import { NextFunction, Request, Response } from 'express';
import delegacionService from 'services/delegacion.service';

class DelegacionController {
  public delegacionService = new delegacionService();

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const delegacionResponseData = await this.delegacionService.getAll();

      res.status(201).json(delegacionResponseData);
    } catch (error) {
      next(error);
    }
  };
}

export default DelegacionController;
