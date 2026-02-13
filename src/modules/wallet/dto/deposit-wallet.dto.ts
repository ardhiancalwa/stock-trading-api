import { IsNumber, Min } from 'class-validator';

export class DepositWalletDto {
  @IsNumber()
  @Min(1)
  amount: number;
}
