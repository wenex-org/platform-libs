import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateDto<T> {
  @IsString()
  @IsOptional()
  ref?: string;

  @IsMongoId()
  @IsOptional()
  owner: string;

  @IsOptional()
  @IsMongoId({ each: true })
  shares?: string[];

  @IsOptional()
  @IsMongoId({ each: true })
  clients: string[];

  @IsOptional()
  @IsString({ each: true })
  groups?: string[];

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsMongoId()
  @IsOptional()
  created_by: string;

  @IsMongoId()
  @IsOptional()
  created_in: string;

  @IsDate()
  @IsOptional()
  updated_at?: Date;

  @IsMongoId()
  @IsOptional()
  updated_by?: string;

  @IsMongoId()
  @IsOptional()
  updated_in?: string;

  @IsDate()
  @IsOptional()
  deleted_at?: Date;

  @IsMongoId()
  @IsOptional()
  deleted_by?: string;

  @IsMongoId()
  @IsOptional()
  deleted_in?: string;

  @IsDate()
  @IsOptional()
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
