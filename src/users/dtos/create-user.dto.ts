import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

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

  @IsOptional()
  @IsString({
    message: 'Please provide a valid picture url',
  })
  @IsUrl(
    {},
    {
      message: 'Please provide a valid picture url',
    },
  )
  picture?: string;

  @IsNotEmpty({
    message: 'Password cannot be empty',
  })
  password: string;

  @IsOptional()
  @IsString({
    message: 'Please provide a valid website url',
  })
  @IsUrl(
    {},
    {
      message: 'Please provide a valid website url',
    },
  )
  website?: string;

  @IsNotEmpty({
    message: 'Gender cannot be empty',
  })
  @IsBoolean({
    message: 'Gender should be true/false',
  })
  @Transform(({ value }) => Boolean(value))
  gender: boolean;

  @IsOptional()
  @IsString({
    message: 'Please provide a valid social media handle',
  })
  socialMediaHandler?: string;

  @IsOptional()
  @IsString({
    message: 'Please provide a valid phone number',
  })
  phone?: string;
}
