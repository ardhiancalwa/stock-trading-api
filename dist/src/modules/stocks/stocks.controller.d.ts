import { StocksService } from './stocks.service';
import { CreateStockDto, UpdateStockDto } from './dto';
export declare class StocksController {
    private readonly stocksService;
    constructor(stocksService: StocksService);
    create(createStockDto: CreateStockDto): Promise<{
        symbol: string;
        createdAt: Date;
        updatedAt: Date;
        companyName: string;
        currentPrice: import("@prisma/client-runtime-utils").Decimal;
        isDeleted: boolean;
    }>;
    findAll(): Promise<{
        symbol: string;
        createdAt: Date;
        updatedAt: Date;
        companyName: string;
        currentPrice: import("@prisma/client-runtime-utils").Decimal;
        isDeleted: boolean;
    }[]>;
    update(symbol: string, updateStockDto: UpdateStockDto): Promise<{
        symbol: string;
        createdAt: Date;
        updatedAt: Date;
        companyName: string;
        currentPrice: import("@prisma/client-runtime-utils").Decimal;
        isDeleted: boolean;
    }>;
    remove(symbol: string): Promise<{
        message: string;
    }>;
}
