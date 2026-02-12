import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { ResponseMessages } from '../../common/constants/messages.constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ResponseMessage(ResponseMessages.REGISTER_SUCCESS)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(ResponseMessages.LOGIN_SUCCESS)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
