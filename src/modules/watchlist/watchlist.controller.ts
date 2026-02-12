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
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { ResponseMessages } from '../../common/constants/messages.constant';

@Controller('watchlist')
@UseGuards(JwtAuthGuard)
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  @ResponseMessage(ResponseMessages.WATCHLIST_ADDED)
  create(
    @CurrentUser() user: { id: string },
    @Body() createWatchlistDto: CreateWatchlistDto,
  ) {
    return this.watchlistService.create(user.id, createWatchlistDto);
  }

  @Get()
  @ResponseMessage(ResponseMessages.WATCHLIST_LIST_SUCCESS)
  findAll(@CurrentUser() user: { id: string }) {
    return this.watchlistService.findAll(user.id);
  }

  @Patch(':id')
  @ResponseMessage(ResponseMessages.UPDATED) // Generic updated message as there is no specific one for watchlist update
  update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() updateWatchlistDto: UpdateWatchlistDto,
  ) {
    return this.watchlistService.update(user.id, id, updateWatchlistDto);
  }

  @Delete(':id')
  @ResponseMessage(ResponseMessages.WATCHLIST_REMOVED)
  remove(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return this.watchlistService.remove(user.id, id);
  }
}
