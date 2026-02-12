import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeDto } from './dto';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { ResponseMessages } from '../../common/constants/messages.constant';

@Controller('trade')
@UseGuards(JwtAuthGuard)
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post('buy')
  @ResponseMessage(ResponseMessages.TRADE_SUCCESS)
  buy(@CurrentUser() user: { id: string }, @Body() tradeDto: TradeDto) {
    return this.tradeService.buy(user.id, tradeDto);
  }

  @Post('sell')
  @ResponseMessage(ResponseMessages.TRADE_SUCCESS)
  sell(@CurrentUser() user: { id: string }, @Body() tradeDto: TradeDto) {
    return this.tradeService.sell(user.id, tradeDto);
  }
}
