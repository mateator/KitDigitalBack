import { IsString } from 'class-validator';

export class delegacionDTO {
  @IsString()
  public ubicacion: string;
}
