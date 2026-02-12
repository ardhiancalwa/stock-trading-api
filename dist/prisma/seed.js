"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const bcrypt = __importStar(require("bcrypt"));
const pool = new pg_1.Pool({ connectionString: process.env['DATABASE_URL'] });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    await prisma.transaction.deleteMany();
    await prisma.portfolio.deleteMany();
    await prisma.watchlist.deleteMany();
    await prisma.wallet.deleteMany();
    await prisma.stock.deleteMany();
    await prisma.user.deleteMany();
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = await Promise.all([
        { email: 'john@example.com', fullName: 'John Doe' },
        { email: 'jane@example.com', fullName: 'Jane Smith' },
        { email: 'budi@example.com', fullName: 'Budi Santoso' },
    ].map((u) => prisma.user.create({
        data: { ...u, password: hashedPassword },
    })));
    await Promise.all(users.map((user, i) => prisma.wallet.create({
        data: {
            userId: user.id,
            balance: [10000000, 25000000, 5000000][i],
        },
    })));
    await Promise.all([
        {
            symbol: 'BBCA',
            companyName: 'PT Bank Central Asia Tbk.',
            currentPrice: 9575,
        },
        {
            symbol: 'BMRI',
            companyName: 'PT Bank Mandiri Tbk.',
            currentPrice: 5000,
        },
        {
            symbol: 'BBRI',
            companyName: 'PT Bank Rakyat Indonesia Tbk.',
            currentPrice: 4500,
        },
        {
            symbol: 'BBNI',
            companyName: 'PT Bank Negara Indonesia Tbk.',
            currentPrice: 4800,
        },
        {
            symbol: 'TLKM',
            companyName: 'PT Telkom Indonesia Tbk.',
            currentPrice: 3650,
        },
        {
            symbol: 'ASII',
            companyName: 'PT Astra International Tbk.',
            currentPrice: 5125,
        },
        {
            symbol: 'UNVR',
            companyName: 'PT Unilever Indonesia Tbk.',
            currentPrice: 2800,
        },
        {
            symbol: 'HMSP',
            companyName: 'PT H.M. Sampoerna Tbk.',
            currentPrice: 800,
        },
        {
            symbol: 'GGRM',
            companyName: 'PT Gudang Garam Tbk.',
            currentPrice: 25000,
        },
        {
            symbol: 'ICBP',
            companyName: 'PT Indofood CBP Sukses Makmur Tbk.',
            currentPrice: 11000,
        },
    ].map((s) => prisma.stock.create({ data: s })));
    await Promise.all([
        {
            userId: users[0].id,
            stockSymbol: 'BBCA',
            targetPrice: 10000,
            notes: 'Target beli saat turun',
        },
        {
            userId: users[0].id,
            stockSymbol: 'TLKM',
            targetPrice: 3500,
            notes: 'Potensi dividen tinggi',
        },
        {
            userId: users[0].id,
            stockSymbol: 'GGRM',
            targetPrice: 24000,
            notes: 'Perhatikan laporan keuangan Q4',
        },
        {
            userId: users[1].id,
            stockSymbol: 'BMRI',
            targetPrice: 5200,
            notes: 'Support kuat di 4800',
        },
        {
            userId: users[1].id,
            stockSymbol: 'ASII',
            targetPrice: 5500,
            notes: 'Prospek otomotif 2026',
        },
        {
            userId: users[2].id,
            stockSymbol: 'BBRI',
            targetPrice: 4200,
            notes: 'Akumulasi bertahap',
        },
        {
            userId: users[2].id,
            stockSymbol: 'ICBP',
            targetPrice: 10500,
            notes: 'Saham consumer defensif',
        },
    ].map((w) => prisma.watchlist.create({ data: w })));
    await Promise.all([
        {
            userId: users[0].id,
            stockSymbol: 'BBCA',
            type: client_1.TransactionType.BUY,
            quantity: 10,
            price: 9500,
        },
        {
            userId: users[0].id,
            stockSymbol: 'TLKM',
            type: client_1.TransactionType.BUY,
            quantity: 50,
            price: 3600,
        },
        {
            userId: users[0].id,
            stockSymbol: 'BMRI',
            type: client_1.TransactionType.BUY,
            quantity: 20,
            price: 4900,
        },
        {
            userId: users[1].id,
            stockSymbol: 'BBRI',
            type: client_1.TransactionType.BUY,
            quantity: 100,
            price: 4400,
        },
        {
            userId: users[1].id,
            stockSymbol: 'ASII',
            type: client_1.TransactionType.BUY,
            quantity: 30,
            price: 5100,
        },
        {
            userId: users[1].id,
            stockSymbol: 'UNVR',
            type: client_1.TransactionType.BUY,
            quantity: 40,
            price: 2900,
        },
        {
            userId: users[1].id,
            stockSymbol: 'BBRI',
            type: client_1.TransactionType.SELL,
            quantity: 20,
            price: 4600,
        },
        {
            userId: users[2].id,
            stockSymbol: 'HMSP',
            type: client_1.TransactionType.BUY,
            quantity: 200,
            price: 790,
        },
        {
            userId: users[2].id,
            stockSymbol: 'ICBP',
            type: client_1.TransactionType.BUY,
            quantity: 15,
            price: 10800,
        },
        {
            userId: users[2].id,
            stockSymbol: 'GGRM',
            type: client_1.TransactionType.BUY,
            quantity: 5,
            price: 24500,
        },
    ].map((t) => prisma.transaction.create({
        data: { ...t, total: t.quantity * t.price },
    })));
    await Promise.all([
        { userId: users[0].id, stockSymbol: 'BBCA', totalShares: 10 },
        { userId: users[0].id, stockSymbol: 'TLKM', totalShares: 50 },
        { userId: users[0].id, stockSymbol: 'BMRI', totalShares: 20 },
        { userId: users[1].id, stockSymbol: 'BBRI', totalShares: 80 },
        { userId: users[1].id, stockSymbol: 'ASII', totalShares: 30 },
        { userId: users[1].id, stockSymbol: 'UNVR', totalShares: 40 },
        { userId: users[2].id, stockSymbol: 'HMSP', totalShares: 200 },
        { userId: users[2].id, stockSymbol: 'ICBP', totalShares: 15 },
        { userId: users[2].id, stockSymbol: 'GGRM', totalShares: 5 },
    ].map((p) => prisma.portfolio.create({ data: p })));
}
main()
    .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map