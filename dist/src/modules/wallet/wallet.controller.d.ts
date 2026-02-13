import { WalletService } from './wallet.service';
import { DepositWalletDto } from './dto';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    getBalance(user: {
        id: string;
    }): Promise<{
        id: string;
        balance: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deposit(user: {
        id: string;
    }, dto: DepositWalletDto): Promise<{
        id: string;
        balance: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
