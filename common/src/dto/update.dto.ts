import { Exclude } from 'class-transformer';
import { IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateDto<T> {
  @IsMongoId()
  @IsOptional()
  owner: string;

  @IsOptional()
  @IsMongoId({ each: true })
  clients: string[];

  @IsOptional()
  zones?: string[];

  @IsOptional()
  @IsMongoId({ each: true })
  shares?: string[];

  @IsOptional()
  @IsDateString()
  created_at: Date;

  @IsMongoId()
  @IsOptional()
  created_by: string;

  @IsMongoId()
  @IsOptional()
  created_in: string;

  @IsOptional()
  @IsDateString()
  updated_at?: Date;

  @IsMongoId()
  @IsOptional()
  updated_by?: string;

  @IsMongoId()
  @IsOptional()
  updated_in?: string;

  @IsOptional()
  @IsDateString()
  deleted_at?: Date;

  @IsMongoId()
  @IsOptional()
  deleted_by?: string;

  @IsMongoId()
  @IsOptional()
  deleted_in?: string;

  @IsOptional()
  @IsDateString()
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
