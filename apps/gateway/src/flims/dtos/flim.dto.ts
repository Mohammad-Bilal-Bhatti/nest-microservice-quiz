import { Type } from "class-transformer";
import { PartialType } from '@nestjs/mapped-types';

import { IsArray, IsNumber, IsString } from "class-validator";

export class AddFlimDto {
  @IsString()
  title: string;

  @IsString()
  director: string;

  @IsNumber()
  release_year: number;

  @IsArray()
  @Type(() => String)
  actors: string[];
}

export class UpdateFlimDto extends PartialType(AddFlimDto) {}