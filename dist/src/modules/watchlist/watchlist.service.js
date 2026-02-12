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
exports.WatchlistService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
let WatchlistService = class WatchlistService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const stock = await this.prisma.stock.findUnique({
            where: { symbol: dto.stock_symbol.toUpperCase() },
        });
        if (!stock || stock.isDeleted) {
            throw new common_1.NotFoundException('Stock not found');
        }
        const existing = await this.prisma.watchlist.findUnique({
            where: {
                userId_stockSymbol: {
                    userId,
                    stockSymbol: dto.stock_symbol.toUpperCase(),
                },
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Stock already in watchlist');
        }
        const watchlistItem = await this.prisma.watchlist.create({
            data: {
                userId,
                stockSymbol: dto.stock_symbol.toUpperCase(),
                targetPrice: dto.target_price,
                notes: dto.notes,
            },
            include: {
                stock: true,
            },
        });
        return watchlistItem;
    }
    async findAll(userId) {
        return this.prisma.watchlist.findMany({
            where: { userId },
            include: {
                stock: {
                    select: {
                        symbol: true,
                        companyName: true,
                        currentPrice: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async update(userId, id, dto) {
        const watchlistItem = await this.prisma.watchlist.findUnique({
            where: { id },
        });
        if (!watchlistItem) {
            throw new common_1.NotFoundException('Watchlist item not found');
        }
        if (watchlistItem.userId !== userId) {
            throw new common_1.ForbiddenException('Not authorized to update this item');
        }
        return this.prisma.watchlist.update({
            where: { id },
            data: {
                ...(dto.target_price !== undefined && {
                    targetPrice: dto.target_price,
                }),
                ...(dto.notes !== undefined && { notes: dto.notes }),
            },
            include: {
                stock: true,
            },
        });
    }
    async remove(userId, id) {
        const watchlistItem = await this.prisma.watchlist.findUnique({
            where: { id },
        });
        if (!watchlistItem) {
            throw new common_1.NotFoundException('Watchlist item not found');
        }
        if (watchlistItem.userId !== userId) {
            throw new common_1.ForbiddenException('Not authorized to delete this item');
        }
        await this.prisma.watchlist.delete({
            where: { id },
        });
        return { message: 'Watchlist item removed successfully' };
    }
};
exports.WatchlistService = WatchlistService;
exports.WatchlistService = WatchlistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], WatchlistService);
//# sourceMappingURL=watchlist.service.js.map