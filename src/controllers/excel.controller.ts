import { NextFunction, Request, Response } from 'express';
import ExcelService from 'services/excel.service';

class ExcelController {
  public excelService = new ExcelService();

  public solicitudesToExcel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = req.body;
      await this.excelService.solicitudesToExcel(filters, res);
    } catch (error) {
      next(error);
    }
  };
}

export default ExcelController;
