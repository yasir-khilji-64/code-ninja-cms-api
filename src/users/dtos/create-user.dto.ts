import { Transform } from 'class-transformer';
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'First name cannot be empty',
  })
  @IsString({
    message: 'Provide a valid first name',
  })
  firstName: string;

  @IsNotEmpty({
    message: 'Last name cannot be empty',
  })
  @IsString({
    message: 'Provide a valid last name',
  })
  lastName: string;

  @IsNotEmpty({
    message: 'Username cannot be empty',
  })
  @IsString({
    message: 'Provide a valid username',
  })
  userName: string;

  @IsNotEmpty({
    message: 'Email cannot be empty',
  })
  @IsString({
    message: 'Provide a valid email',
  })
  email: string;

  @IsNotEmpty({
    message: 'DoB cannot be empty',
  })
  @IsDateString({
    strict: true,
  })
  dob: Date;

  @IsNotEmpty({
    message: 'Password cannot be empty',
  })
  password: string;

  @IsNotEmpty({
    message: 'Gender cannot be empty',
  })
  @IsBoolean({
    message: 'Gender should be true/false',
  })
  @Transform(({ value }) => Boolean(value))
  gender: boolean;
}
