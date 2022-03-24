import { Router } from 'express';
import { Routes } from 'interfaces/routes.interface';
import ExcelController from 'controllers/excel.controller';

class ExcelRoute implements Routes {
  public path = '/excel/download';
  public router = Router();
  public excelController = new ExcelController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.excelController.solicitudesToExcel);
  }
}

export default ExcelRoute;
