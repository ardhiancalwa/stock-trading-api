import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { TradeDto } from './dto';

@Injectable()
export class TradeService {
  constructor(private readonly prisma: PrismaService) {}

  async buy(userId: string, dto: TradeDto) {
    const stockSymbol = dto.stock_symbol.toUpperCase();

    return this.prisma.$transaction(async (tx) => {
      const stock = await tx.stock.findUnique({
        where: { symbol: stockSymbol },
      });

      if (!stock || stock.isDeleted) {
        throw new NotFoundException('Stock not found');
      }

      const stockPrice = Number(stock.currentPrice);
      const totalCost = stockPrice * dto.quantity;

      const wallet = await tx.wallet.findUnique({
        where: { userId },
      });

      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      }

      const walletBalance = Number(wallet.balance);
      if (walletBalance < totalCost) {
        throw new BadRequestException('Insufficient balance');
      }

      await tx.wallet.update({
        where: { userId },
        data: {
          balance: { decrement: totalCost },
        },
      });

      await tx.portfolio.upsert({
        where: {
          userId_stockSymbol: {
            userId,
            stockSymbol,
          },
        },
        create: {
          userId,
          stockSymbol,
          totalShares: dto.quantity,
        },
        update: {
          totalShares: { increment: dto.quantity },
        },
      });

      const transaction = await tx.transaction.create({
        data: {
          userId,
          stockSymbol,
          type: 'BUY',
          quantity: dto.quantity,
          price: stockPrice,
          total: totalCost,
        },
      });

      return {
        message: 'Buy order executed successfully',
        transaction: {
          id: transaction.id,
          type: transaction.type,
          stock_symbol: transaction.stockSymbol,
          quantity: transaction.quantity,
          price_per_share: transaction.price,
          total_amount: transaction.total,
          created_at: transaction.createdAt,
        },
      };
    });
  }

  async sell(userId: string, dto: TradeDto) {
    const stockSymbol = dto.stock_symbol.toUpperCase();

    return this.prisma.$transaction(async (tx) => {
      const stock = await tx.stock.findUnique({
        where: { symbol: stockSymbol },
      });

      if (!stock) {
        throw new NotFoundException('Stock not found');
      }

      const portfolio = await tx.portfolio.findUnique({
        where: {
          userId_stockSymbol: {
            userId,
            stockSymbol,
          },
        },
      });

      if (!portfolio || portfolio.totalShares < dto.quantity) {
        throw new BadRequestException('Insufficient stock shares');
      }

      const stockPrice = Number(stock.currentPrice);
      const totalValue = stockPrice * dto.quantity;

      const newShares = portfolio.totalShares - dto.quantity;
      if (newShares === 0) {
        await tx.portfolio.delete({
          where: {
            userId_stockSymbol: {
              userId,
              stockSymbol,
            },
          },
        });
      } else {
        await tx.portfolio.update({
          where: {
            userId_stockSymbol: {
              userId,
              stockSymbol,
            },
          },
          data: {
            totalShares: newShares,
          },
        });
      }

      await tx.wallet.update({
        where: { userId },
        data: {
          balance: { increment: totalValue },
        },
      });

      const transaction = await tx.transaction.create({
        data: {
          userId,
          stockSymbol,
          type: 'SELL',
          quantity: dto.quantity,
          price: stockPrice,
          total: totalValue,
        },
      });

      return {
        message: 'Sell order executed successfully',
        transaction: {
          id: transaction.id,
          type: transaction.type,
          stock_symbol: transaction.stockSymbol,
          quantity: transaction.quantity,
          price_per_share: transaction.price,
          total_amount: transaction.total,
          created_at: transaction.createdAt,
        },
      };
    });
  }
}
