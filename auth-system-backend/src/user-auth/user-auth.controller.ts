import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  InternalServerErrorException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { User } from '../models/user.schema';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/dto/create-user-dtos/create-user.dto';
import { CreateUserResponseDto } from 'src/dto/create-user-dtos/create-user-response.dto';
import { LoginUserDto } from 'src/dto/login-user-dtos/login-user.dto';
import { LoginUserResponseDto } from 'src/dto/login-user-dtos/login-user-response.dto ';

@Controller('api/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}
  @Post('register')
  async registerUser(
    @Body() body: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const token = await this.userAuthService.registerUser(body);
    return { message: 'User registered successfully', token };
  }

  @Post('login')
  async loginUser(@Body() body: LoginUserDto): Promise<LoginUserResponseDto> {
    const { email, password } = body;
    const token = await this.userAuthService.loginUser(email, password);
    return { message: 'Login successful', token };
  }

  @Get('users')
  @UseGuards(AuthGuard)
  async getUsers(): Promise<User[]> {
    return this.userAuthService.getUsers();
  }
}
