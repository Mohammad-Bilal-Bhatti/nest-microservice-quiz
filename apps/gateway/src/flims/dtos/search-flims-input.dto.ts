import { Transform, Type } from "class-transformer";
import { IsArray, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class SearchFlimsInput {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  release_year?: number;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  @Type(() => String)
  actors?: string[];
}