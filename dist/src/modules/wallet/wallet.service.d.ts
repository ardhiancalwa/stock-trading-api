import { PrismaService } from '../../prisma';
import { DepositWalletDto } from './dto';
export declare class WalletService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getBalance(userId: string): Promise<{
        id: string;
        balance: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deposit(userId: string, dto: DepositWalletDto): Promise<{
        id: string;
        balance: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
