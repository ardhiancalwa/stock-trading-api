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
exports.StocksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const messages_constant_1 = require("../../common/constants/messages.constant");
let StocksService = class StocksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existingStock = await this.prisma.stock.findUnique({
            where: { symbol: dto.symbol.toUpperCase() },
        });
        if (existingStock) {
            throw new common_1.ConflictException('Stock symbol already exists');
        }
        const stock = await this.prisma.stock.create({
            data: {
                symbol: dto.symbol.toUpperCase(),
                companyName: dto.company_name,
                currentPrice: dto.current_price,
            },
        });
        return stock;
    }
    async findAll() {
        const stocks = await this.prisma.stock.findMany({
            where: { isDeleted: false },
            orderBy: { symbol: 'asc' },
        });
        if (!stocks || stocks.length === 0) {
            throw new common_1.NotFoundException(messages_constant_1.ResponseMessages.STOCK_LIST_SUCCESS);
        }
        return stocks;
    }
    async findOne(symbol) {
        const stock = await this.prisma.stock.findUnique({
            where: { symbol: symbol.toUpperCase() },
        });
        if (!stock || stock.isDeleted) {
            throw new common_1.NotFoundException('Stock not found');
        }
        return stock;
    }
    async update(symbol, dto) {
        await this.findOne(symbol);
        const stock = await this.prisma.stock.update({
            where: { symbol: symbol.toUpperCase() },
            data: {
                ...(dto.company_name && { companyName: dto.company_name }),
                ...(dto.current_price !== undefined && {
                    currentPrice: dto.current_price,
                }),
            },
        });
        return stock;
    }
    async remove(symbol) {
        await this.findOne(symbol);
        await this.prisma.stock.update({
            where: { symbol: symbol.toUpperCase() },
            data: { isDeleted: true },
        });
        return { message: 'Stock deleted successfully' };
    }
};
exports.StocksService = StocksService;
exports.StocksService = StocksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StocksService);
//# sourceMappingURL=stocks.service.js.map