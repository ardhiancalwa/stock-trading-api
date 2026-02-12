import { TradeService } from './trade.service';
import { TradeDto } from './dto';
export declare class TradeController {
    private readonly tradeService;
    constructor(tradeService: TradeService);
    buy(user: {
        id: string;
    }, tradeDto: TradeDto): Promise<{
        message: string;
        transaction: {
            id: string;
            type: import("@prisma/client").$Enums.TransactionType;
            stock_symbol: string;
            quantity: number;
            price_per_share: import("@prisma/client-runtime-utils").Decimal;
            total_amount: import("@prisma/client-runtime-utils").Decimal;
            created_at: Date;
        };
    }>;
    sell(user: {
        id: string;
    }, tradeDto: TradeDto): Promise<{
        message: string;
        transaction: {
            id: string;
            type: import("@prisma/client").$Enums.TransactionType;
            stock_symbol: string;
            quantity: number;
            price_per_share: import("@prisma/client-runtime-utils").Decimal;
            total_amount: import("@prisma/client-runtime-utils").Decimal;
            created_at: Date;
        };
    }>;
}
