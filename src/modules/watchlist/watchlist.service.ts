import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { CreateWatchlistDto, UpdateWatchlistDto } from './dto';

@Injectable()
export class WatchlistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateWatchlistDto) {
    const stock = await this.prisma.stock.findUnique({
      where: { symbol: dto.stock_symbol.toUpperCase() },
    });

    if (!stock || stock.isDeleted) {
      throw new NotFoundException('Stock not found');
    }

    const existing = await this.prisma.watchlist.findUnique({
      where: {
        userId_stockSymbol: {
          userId,
          stockSymbol: dto.stock_symbol.toUpperCase(),
        },
      },
    });

    if (existing) {
      throw new ConflictException('Stock already in watchlist');
    }

    const watchlistItem = await this.prisma.watchlist.create({
      data: {
        userId,
        stockSymbol: dto.stock_symbol.toUpperCase(),
        targetPrice: dto.target_price,
        notes: dto.notes,
      },
      include: {
        stock: true,
      },
    });

    return watchlistItem;
  }

  async findAll(userId: string) {
    return this.prisma.watchlist.findMany({
      where: { userId },
      include: {
        stock: {
          select: {
            symbol: true,
            companyName: true,
            currentPrice: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(userId: string, id: string, dto: UpdateWatchlistDto) {
    const watchlistItem = await this.prisma.watchlist.findUnique({
      where: { id },
    });

    if (!watchlistItem) {
      throw new NotFoundException('Watchlist item not found');
    }

    if (watchlistItem.userId !== userId) {
      throw new ForbiddenException('Not authorized to update this item');
    }

    return this.prisma.watchlist.update({
      where: { id },
      data: {
        ...(dto.target_price !== undefined && {
          targetPrice: dto.target_price,
        }),
        ...(dto.notes !== undefined && { notes: dto.notes }),
      },
      include: {
        stock: true,
      },
    });
  }

  async remove(userId: string, id: string) {
    const watchlistItem = await this.prisma.watchlist.findUnique({
      where: { id },
    });

    if (!watchlistItem) {
      throw new NotFoundException('Watchlist item not found');
    }

    if (watchlistItem.userId !== userId) {
      throw new ForbiddenException('Not authorized to delete this item');
    }

    await this.prisma.watchlist.delete({
      where: { id },
    });

    return null;
  }
}
