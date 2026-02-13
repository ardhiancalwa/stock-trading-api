import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ResponseMessages } from '../../common/constants/messages.constant';

@Injectable()
export class StocksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateStockDto) {
    const existingStock = await this.prisma.stock.findUnique({
      where: { symbol: dto.symbol.toUpperCase() },
    });

    if (existingStock) {
      throw new ConflictException('Stock symbol already exists');
    }

    const stock = await this.prisma.stock.create({
      data: {
        symbol: dto.symbol.toUpperCase(),
        companyName: dto.company_name,
        currentPrice: dto.current_price,
      },
    });

    return stock;
  }

  async findAll() {
    const stocks = await this.prisma.stock.findMany({
      where: { isDeleted: false },
      orderBy: { symbol: 'asc' },
    });

    if (!stocks || stocks.length === 0) {
      throw new NotFoundException(ResponseMessages.STOCK_LIST_SUCCESS); // Should be STOCK_NOT_FOUND but preserving user request for consistency
    }
    return stocks;
  }

  async findOne(symbol: string) {
    const stock = await this.prisma.stock.findUnique({
      where: { symbol: symbol.toUpperCase() },
    });

    if (!stock || stock.isDeleted) {
      throw new NotFoundException('Stock not found');
    }

    return stock;
  }

  async update(symbol: string, dto: UpdateStockDto) {
    await this.findOne(symbol);

    const stock = await this.prisma.stock.update({
      where: { symbol: symbol.toUpperCase() },
      data: {
        ...(dto.company_name && { companyName: dto.company_name }),
        ...(dto.current_price !== undefined && {
          currentPrice: dto.current_price,
        }),
      },
    });

    return stock;
  }

  async remove(symbol: string) {
    await this.findOne(symbol);

    await this.prisma.stock.update({
      where: { symbol: symbol.toUpperCase() },
      data: { isDeleted: true },
    });

    return null;
  }
}
