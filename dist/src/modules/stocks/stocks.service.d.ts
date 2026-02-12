import { PrismaService } from '../../prisma/prisma.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
export declare class StocksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateStockDto): Promise<{
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
    findOne(symbol: string): Promise<{
        symbol: string;
        createdAt: Date;
        updatedAt: Date;
        companyName: string;
        currentPrice: import("@prisma/client-runtime-utils").Decimal;
        isDeleted: boolean;
    }>;
    update(symbol: string, dto: UpdateStockDto): Promise<{
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
