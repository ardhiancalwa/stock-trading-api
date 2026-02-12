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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeController = void 0;
const common_1 = require("@nestjs/common");
const trade_service_1 = require("./trade.service");
const dto_1 = require("./dto");
const guards_1 = require("../../common/guards");
const decorators_1 = require("../../common/decorators");
const response_message_decorator_1 = require("../../common/decorators/response-message.decorator");
const messages_constant_1 = require("../../common/constants/messages.constant");
let TradeController = class TradeController {
    tradeService;
    constructor(tradeService) {
        this.tradeService = tradeService;
    }
    buy(user, tradeDto) {
        return this.tradeService.buy(user.id, tradeDto);
    }
    sell(user, tradeDto) {
        return this.tradeService.sell(user.id, tradeDto);
    }
};
exports.TradeController = TradeController;
__decorate([
    (0, common_1.Post)('buy'),
    (0, response_message_decorator_1.ResponseMessage)(messages_constant_1.ResponseMessages.TRADE_SUCCESS),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.TradeDto]),
    __metadata("design:returntype", void 0)
], TradeController.prototype, "buy", null);
__decorate([
    (0, common_1.Post)('sell'),
    (0, response_message_decorator_1.ResponseMessage)(messages_constant_1.ResponseMessages.TRADE_SUCCESS),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.TradeDto]),
    __metadata("design:returntype", void 0)
], TradeController.prototype, "sell", null);
exports.TradeController = TradeController = __decorate([
    (0, common_1.Controller)('trade'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:paramtypes", [trade_service_1.TradeService])
], TradeController);
//# sourceMappingURL=trade.controller.js.map