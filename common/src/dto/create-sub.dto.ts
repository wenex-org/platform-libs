import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDto<T> {
  @IsString()
  @IsOptional()
  ref?: string;

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
  @IsString({ each: true })
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

  @IsObject()
  @IsOptional()
  attrs?: { [x: string]: boolean | number | string };

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  constructor(data?: Partial<CreateDto<T>>) {
    if (data) Object.assign(this, data);
  }
}
