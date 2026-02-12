import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto, UpdateStockDto } from './dto';
import { JwtAuthGuard } from '../../common/guards';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { ResponseMessages } from '../../common/constants/messages.constant';

@Controller('stocks')
@UseGuards(JwtAuthGuard)
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  @ResponseMessage(ResponseMessages.STOCK_CREATED)
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  @ResponseMessage(ResponseMessages.STOCK_LIST_SUCCESS)
  findAll() {
    return this.stocksService.findAll();
  }

  @Get(':symbol')
  @ResponseMessage(ResponseMessages.STOCK_DETAIL_SUCCESS)
  findOne(@Param('symbol') symbol: string) {
    return this.stocksService.findOne(symbol);
  }

  @Patch(':symbol')
  @ResponseMessage(ResponseMessages.STOCK_UPDATED)
  update(
    @Param('symbol') symbol: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return this.stocksService.update(symbol, updateStockDto);
  }

  @Delete(':symbol')
  @ResponseMessage(ResponseMessages.STOCK_DELETED)
  remove(@Param('symbol') symbol: string) {
    return this.stocksService.remove(symbol);
  }
}
