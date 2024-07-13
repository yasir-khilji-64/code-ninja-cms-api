import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { MongoErrorCode } from 'src/database/mongo-error-codes.enum';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  private async verifyPassword(password: string, hash: string) {
    const isPasswordMatch = await bcrypt.compare(password, hash);
    if (!isPasswordMatch) {
      throw new HttpException(
        'Wrong login credentials, please try again',
        HttpStatus.CONFLICT,
      );
    }
  }

  public async register(details: RegisterUserDto) {
    try {
      const hashedPassword = await this.hashPassword(details['password']);
      const createdUser = await this.usersService.create({
        ...details,
        password: hashedPassword,
      });
      createdUser['password'] = undefined;
      createdUser['is_deleted'] = undefined;
      createdUser['deleted_at'] = undefined;
      createdUser['created_at'] = undefined;
      createdUser['updated_at'] = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === MongoErrorCode.UniqueViolation) {
        throw new HttpException('Email already in use', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(email: string, password: string) {
    try {
      const users = await this.usersService.find({ email: email });
      const user = users[0];
      await this.verifyPassword(password, user['password']);
      user['password'] = undefined;
      user['is_deleted'] = undefined;
      user['deleted_at'] = undefined;
      user['created_at'] = undefined;
      user['updated_at'] = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong login credentials, please try again',
        HttpStatus.CONFLICT,
      );
    }
  }
}
