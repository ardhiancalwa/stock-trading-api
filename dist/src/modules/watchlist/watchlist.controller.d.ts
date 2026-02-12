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
        notes: string | null;
        userId: string;
        stockSymbol: string;
        targetPrice: import("@prisma/client-runtime-utils").Decimal | null;
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
        notes: string | null;
        userId: string;
        stockSymbol: string;
        targetPrice: import("@prisma/client-runtime-utils").Decimal | null;
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
        notes: string | null;
        userId: string;
        stockSymbol: string;
        targetPrice: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    remove(user: {
        id: string;
    }, id: string): Promise<{
        message: string;
    }>;
}
