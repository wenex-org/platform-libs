import {
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubDto<T> {
  @IsString()
  @IsOptional()
  ref?: string;

  @IsMongoId()
  @IsNotEmpty()
  uid: string;

  @IsOptional()
  @IsMongoId({ each: true })
  shares?: string[];

  @IsOptional()
  @IsString({ each: true })
  groups?: string[];

  @IsString()
  @IsOptional()
  version?: string;

  @IsObject()
  @IsOptional()
  attrs?: { [x: string]: boolean | number | string };

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}