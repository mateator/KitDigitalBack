import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class SolicitudDTO {
  @IsBoolean()
  public asignado: boolean;

  @IsBoolean()
  public contactado: boolean;

  @IsBoolean()
  public presupuestado: boolean;

  @IsBoolean()
  public tramitado: boolean;

  @IsString()
  @IsOptional()
  public comercial: string;

  @IsString()
  public cliente: string;

  @IsString()
  public email: string;

  @IsString()
  @IsOptional()
  public observaciones: string;

  @IsNumber()
  public telefono: number;

  @IsNumber()
  @IsOptional()
  public telefono2: number;

  @IsString()
  public contacto: string;

  @IsString()
  @IsOptional()
  public localidad: string;

  @IsString()
  @IsOptional()
  public segmento: string;

  @IsString()
  @IsOptional()
  public provincia: string;

  @IsString()
  @IsOptional()
  public agenteDigital: string;

  @IsNumber()
  public delegacionId: number;
}
