import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async getPortfolio(userId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
      select: { balance: true },
    });
    const assets = await this.prisma.portfolio.findMany({
      where: {
        userId,
        totalShares: { gt: 0 },
      },
      include: {
        stock: {
          select: {
            symbol: true,
            companyName: true,
            currentPrice: true,
          },
        },
      },
    });

    const totalValue = assets.reduce((sum, asset) => {
      const stockValue = Number(asset.stock.currentPrice) * asset.totalShares;
      return sum + stockValue;
    }, 0);

    return {
      balance: wallet?.balance || 0,
      total_portfolio_value: totalValue,
      assets: assets.map((asset) => ({
        symbol: asset.stock.symbol,
        company_name: asset.stock.companyName,
        current_price: asset.stock.currentPrice,
        total_shares: asset.totalShares,
        market_value: Number(asset.stock.currentPrice) * asset.totalShares,
      })),
    };
  }

  async getStockBalance(userId: string, stockSymbol: string): Promise<number> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: {
        userId_stockSymbol: {
          userId,
          stockSymbol: stockSymbol.toUpperCase(),
        },
      },
    });

    return portfolio?.totalShares || 0;
  }
}
