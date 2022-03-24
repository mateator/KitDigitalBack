import { IsNumber } from 'class-validator';

export class SolicitudInteresDTO {
  @IsNumber()
  public idSolicitud: number;

  @IsNumber()
  public idInteres: number;
}
