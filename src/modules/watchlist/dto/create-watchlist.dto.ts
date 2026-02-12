import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateWatchlistDto {
  @IsString()
  stock_symbol: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  target_price?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
