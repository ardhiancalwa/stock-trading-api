import { IsString, IsInt, Min } from 'class-validator';

export class TradeDto {
  @IsString()
  stock_symbol: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
