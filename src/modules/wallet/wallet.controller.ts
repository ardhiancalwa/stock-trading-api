import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { DepositWalletDto } from './dto';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { ResponseMessages } from '../../common/constants/messages.constant';

@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  @ResponseMessage(ResponseMessages.WALLET_SUCCESS)
  getBalance(@CurrentUser() user: { id: string }) {
    return this.walletService.getBalance(user.id);
  }

  @Post('deposit')
  @ResponseMessage(ResponseMessages.WALLET_DEPOSIT_SUCCESS)
  deposit(@CurrentUser() user: { id: string }, @Body() dto: DepositWalletDto) {
    return this.walletService.deposit(user.id, dto);
  }
}
