import { IsString } from 'class-validator';

export class interesDTO {
  @IsString()
  public tipo: string;
}
