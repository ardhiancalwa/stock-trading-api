import { PrismaService } from '../../prisma';
import { CreateWatchlistDto, UpdateWatchlistDto } from './dto';
export declare class WatchlistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateWatchlistDto): Promise<{
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
    findAll(userId: string): Promise<({
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
    update(userId: string, id: string, dto: UpdateWatchlistDto): Promise<{
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
    remove(userId: string, id: string): Promise<{
        message: string;
    }>;
}
