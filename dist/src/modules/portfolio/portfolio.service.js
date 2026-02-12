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
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
let PortfolioService = class PortfolioService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPortfolio(userId) {
        const wallet = await this.prisma.wallet.findUnique({
            where: { userId },
            select: { balance: true },
        });
        const assets = await this.prisma.portfolio.findMany({
            where: {
                userId,
                totalShares: { gt: 0 },
            },
            include: {
                stock: {
                    select: {
                        symbol: true,
                        companyName: true,
                        currentPrice: true,
                    },
                },
            },
        });
        const totalValue = assets.reduce((sum, asset) => {
            const stockValue = Number(asset.stock.currentPrice) * asset.totalShares;
            return sum + stockValue;
        }, 0);
        return {
            balance: wallet?.balance || 0,
            total_portfolio_value: totalValue,
            assets: assets.map((asset) => ({
                symbol: asset.stock.symbol,
                company_name: asset.stock.companyName,
                current_price: asset.stock.currentPrice,
                total_shares: asset.totalShares,
                market_value: Number(asset.stock.currentPrice) * asset.totalShares,
            })),
        };
    }
    async getStockBalance(userId, stockSymbol) {
        const portfolio = await this.prisma.portfolio.findUnique({
            where: {
                userId_stockSymbol: {
                    userId,
                    stockSymbol: stockSymbol.toUpperCase(),
                },
            },
        });
        return portfolio?.totalShares || 0;
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map