import { IsString, IsNumber, Min } from 'class-validator';

export class CreateStockDto {
  @IsString()
  symbol: string;

  @IsString()
  company_name: string;

  @IsNumber()
  @Min(0)
  current_price: number;
}
