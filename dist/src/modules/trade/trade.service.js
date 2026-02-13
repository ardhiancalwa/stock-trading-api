"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
let TradeService = class TradeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async buy(userId, dto) {
        const stockSymbol = dto.stock_symbol.toUpperCase();
        return this.prisma.$transaction(async (tx) => {
            const stock = await tx.stock.findUnique({
                where: { symbol: stockSymbol },
            });
            if (!stock || stock.isDeleted) {
                throw new common_1.NotFoundException('Stock not found');
            }
            const stockPrice = Number(stock.currentPrice);
            const totalCost = stockPrice * dto.quantity;
            const wallet = await tx.wallet.findUnique({
                where: { userId },
            });
            if (!wallet) {
                throw new common_1.NotFoundException('Wallet not found');
            }
            const walletBalance = Number(wallet.balance);
            if (walletBalance < totalCost) {
                throw new common_1.BadRequestException('Insufficient balance');
            }
            await tx.wallet.update({
                where: { userId },
                data: {
                    balance: { decrement: totalCost },
                },
            });
            await tx.portfolio.upsert({
                where: {
                    userId_stockSymbol: {
                        userId,
                        stockSymbol,
                    },
                },
                create: {
                    userId,
                    stockSymbol,
                    totalShares: dto.quantity,
                },
                update: {
                    totalShares: { increment: dto.quantity },
                },
            });
            const transaction = await tx.transaction.create({
                data: {
                    userId,
                    stockSymbol,
                    type: 'BUY',
                    quantity: dto.quantity,
                    price: stockPrice,
                    total: totalCost,
                },
            });
            return {
                transaction: {
                    id: transaction.id,
                    type: transaction.type,
                    stock_symbol: transaction.stockSymbol,
                    quantity: transaction.quantity,
                    price_per_share: transaction.price,
                    total_amount: transaction.total,
                    created_at: transaction.createdAt,
                },
            };
        });
    }
    async sell(userId, dto) {
        const stockSymbol = dto.stock_symbol.toUpperCase();
        return this.prisma.$transaction(async (tx) => {
            const stock = await tx.stock.findUnique({
                where: { symbol: stockSymbol },
            });
            if (!stock) {
                throw new common_1.NotFoundException('Stock not found');
            }
            const portfolio = await tx.portfolio.findUnique({
                where: {
                    userId_stockSymbol: {
                        userId,
                        stockSymbol,
                    },
                },
            });
            if (!portfolio || portfolio.totalShares < dto.quantity) {
                throw new common_1.BadRequestException('Insufficient stock shares');
            }
            const stockPrice = Number(stock.currentPrice);
            const totalValue = stockPrice * dto.quantity;
            const newShares = portfolio.totalShares - dto.quantity;
            if (newShares === 0) {
                await tx.portfolio.delete({
                    where: {
                        userId_stockSymbol: {
                            userId,
                            stockSymbol,
                        },
                    },
                });
            }
            else {
                await tx.portfolio.update({
                    where: {
                        userId_stockSymbol: {
                            userId,
                            stockSymbol,
                        },
                    },
                    data: {
                        totalShares: newShares,
                    },
                });
            }
            await tx.wallet.update({
                where: { userId },
                data: {
                    balance: { increment: totalValue },
                },
            });
            const transaction = await tx.transaction.create({
                data: {
                    userId,
                    stockSymbol,
                    type: 'SELL',
                    quantity: dto.quantity,
                    price: stockPrice,
                    total: totalValue,
                },
            });
            return {
                transaction: {
                    id: transaction.id,
                    type: transaction.type,
                    stock_symbol: transaction.stockSymbol,
                    quantity: transaction.quantity,
                    price_per_share: transaction.price,
                    total_amount: transaction.total,
                    created_at: transaction.createdAt,
                },
            };
        });
    }
};
exports.TradeService = TradeService;
exports.TradeService = TradeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], TradeService);
//# sourceMappingURL=trade.service.js.map