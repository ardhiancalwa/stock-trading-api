"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_1 = require("./prisma");
const auth_module_1 = require("./modules/auth/auth.module");
const stocks_module_1 = require("./modules/stocks/stocks.module");
const watchlist_module_1 = require("./modules/watchlist/watchlist.module");
const portfolio_module_1 = require("./modules/portfolio/portfolio.module");
const trade_module_1 = require("./modules/trade/trade.module");
const wallet_module_1 = require("./modules/wallet/wallet.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            prisma_1.PrismaModule,
            auth_module_1.AuthModule,
            stocks_module_1.StocksModule,
            watchlist_module_1.WatchlistModule,
            portfolio_module_1.PortfolioModule,
            trade_module_1.TradeModule,
            wallet_module_1.WalletModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map