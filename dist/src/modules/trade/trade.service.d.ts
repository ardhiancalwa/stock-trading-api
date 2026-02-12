import { PrismaService } from '../../prisma';
import { TradeDto } from './dto';
export declare class TradeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    buy(userId: string, dto: TradeDto): Promise<{
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
    sell(userId: string, dto: TradeDto): Promise<{
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
