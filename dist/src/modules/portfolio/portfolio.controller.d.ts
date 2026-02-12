import { PortfolioService } from './portfolio.service';
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    getPortfolio(user: {
        id: string;
    }): Promise<{
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
}
