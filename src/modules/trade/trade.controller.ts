import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeDto } from './dto';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators';

@Controller('trade')
@UseGuards(JwtAuthGuard)
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post('buy')
  buy(@CurrentUser() user: { id: string }, @Body() tradeDto: TradeDto) {
    return this.tradeService.buy(user.id, tradeDto);
  }

  @Post('sell')
  sell(@CurrentUser() user: { id: string }, @Body() tradeDto: TradeDto) {
    return this.tradeService.sell(user.id, tradeDto);
  }
}
