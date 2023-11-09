import {
  Injectable,
  NotFoundException,
  Logger,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserResponseDto } from 'src/dto/create-user-dtos/create-user-response.dto';
import { CreateUserDto } from 'src/dto/create-user-dtos/create-user.dto';

@Injectable()
export class UserAuthService {
  private readonly logger = new Logger(UserAuthService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    createUser: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const { username, email, password } = createUser;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new BadRequestException(
        'Failed to create user, User exist with that email',
      );
    }
    const hash = await bcrypt.hash(password, 10);
    await this.userModel.create({ username, password: hash, email });
    return { message: 'User registered successfully' };
  }

  async loginUser(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid login credentials');
    }
    const payload = { username: user.username };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find({}).select('-password').exec();
    return users;
  }
}
