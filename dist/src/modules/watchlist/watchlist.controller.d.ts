import { WatchlistService } from './watchlist.service';
import { CreateWatchlistDto, UpdateWatchlistDto } from './dto';
export declare class WatchlistController {
    private readonly watchlistService;
    constructor(watchlistService: WatchlistService);
    create(user: {
        id: string;
    }, createWatchlistDto: CreateWatchlistDto): Promise<{
        stock: {
            symbol: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            currentPrice: import("@prisma/client-runtime-utils").Decimal;
            isDeleted: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        targetPrice: import("@prisma/client-runtime-utils").Decimal | null;
        notes: string | null;
        stockSymbol: string;
    }>;
    findAll(user: {
        id: string;
    }): Promise<({
        stock: {
            symbol: string;
            companyName: string;
            currentPrice: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        targetPrice: import("@prisma/client-runtime-utils").Decimal | null;
        notes: string | null;
        stockSymbol: string;
    })[]>;
    update(user: {
        id: string;
    }, id: string, updateWatchlistDto: UpdateWatchlistDto): Promise<{
        stock: {
            symbol: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            currentPrice: import("@prisma/client-runtime-utils").Decimal;
            isDeleted: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        targetPrice: import("@prisma/client-runtime-utils").Decimal | null;
        notes: string | null;
        stockSymbol: string;
    }>;
    remove(user: {
        id: string;
    }, id: string): Promise<{
        message: string;
    }>;
}
