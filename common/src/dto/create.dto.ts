import {
  IsDate,
  IsDateString,
  IsFQDN,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDto<T> {
  @IsMongoId()
  @IsNotEmpty()
  owner: string;

  @IsOptional()
  @IsMongoId({ each: true })
  shares?: string[];

  @IsNotEmpty()
  @IsMongoId({ each: true })
  clients: string[];

  @IsOptional()
  @IsFQDN(null, { each: true })
  groups?: string[];

  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @IsMongoId()
  @IsOptional()
  created_by: string;

  @IsMongoId()
  @IsOptional()
  created_in: string;

  @IsDate()
  @IsNotEmpty()
  updated_at?: Date;

  @IsMongoId()
  @IsOptional()
  updated_by?: string;

  @IsMongoId()
  @IsOptional()
  updated_in?: string;

  @IsDate()
  @IsNotEmpty()
  deleted_at?: Date;

  @IsMongoId()
  @IsOptional()
  deleted_by?: string;

  @IsMongoId()
  @IsOptional()
  deleted_in?: string;

  @IsDate()
  @IsNotEmpty()
  restored_at?: Date;

  @IsMongoId()
  @IsOptional()
  restored_by?: string;

  @IsMongoId()
  @IsOptional()
  restored_in?: string;

  @IsString()
  @IsOptional()
  version?: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}
