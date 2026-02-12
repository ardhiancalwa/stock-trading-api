import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateStockDto {
  @IsOptional()
  @IsString()
  company_name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  current_price?: number;
}
