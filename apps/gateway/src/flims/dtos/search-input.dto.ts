import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class SearchInput {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsNumber()
  release_year?: number;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  actors?: string[];
}