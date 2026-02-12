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

@Controller('stocks')
@UseGuards(JwtAuthGuard)
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  findAll() {
    return this.stocksService.findAll();
  }

  @Patch(':symbol')
  update(@Param('symbol') symbol: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(symbol, updateStockDto);
  }

  @Delete(':symbol')
  remove(@Param('symbol') symbol: string) {
    return this.stocksService.remove(symbol);
  }
}
