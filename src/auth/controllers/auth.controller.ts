import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RequestWithUser } from '../interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async registe(@Body() details: RegisterUserDto) {
    const user = await this.authService.register(details);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    return user;
  }
}
