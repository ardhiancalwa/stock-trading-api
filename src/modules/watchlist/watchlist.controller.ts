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
import { WatchlistService } from './watchlist.service';
import { CreateWatchlistDto, UpdateWatchlistDto } from './dto';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators';

@Controller('watchlist')
@UseGuards(JwtAuthGuard)
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  create(
    @CurrentUser() user: { id: string },
    @Body() createWatchlistDto: CreateWatchlistDto,
  ) {
    return this.watchlistService.create(user.id, createWatchlistDto);
  }

  @Get()
  findAll(@CurrentUser() user: { id: string }) {
    return this.watchlistService.findAll(user.id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() updateWatchlistDto: UpdateWatchlistDto,
  ) {
    return this.watchlistService.update(user.id, id, updateWatchlistDto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return this.watchlistService.remove(user.id, id);
  }
}
