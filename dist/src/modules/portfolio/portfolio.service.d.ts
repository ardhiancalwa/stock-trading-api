import { PrismaService } from '../../prisma';
export declare class PortfolioService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getPortfolio(userId: string): Promise<{
        balance: number | import("@prisma/client-runtime-utils").Decimal;
        total_portfolio_value: number;
        assets: {
            symbol: string;
            company_name: string;
            current_price: import("@prisma/client-runtime-utils").Decimal;
            total_shares: number;
            market_value: number;
        }[];
    }>;
    getStockBalance(userId: string, stockSymbol: string): Promise<number>;
}
