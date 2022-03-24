import { IsNumber, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsNumber()
  public delegacionId: number;
}
