import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma';
import { AuthModule } from './modules/auth/auth.module';
import { StocksModule } from './modules/stocks/stocks.module';
import { WatchlistModule } from './modules/watchlist/watchlist.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { TradeModule } from './modules/trade/trade.module';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    StocksModule,
    WatchlistModule,
    PortfolioModule,
    TradeModule,
    WalletModule,
  ],
})
export class AppModule {}
