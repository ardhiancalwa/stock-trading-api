import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateWatchlistDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  target_price?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
