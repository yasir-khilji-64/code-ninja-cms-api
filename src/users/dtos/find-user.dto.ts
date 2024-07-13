import { IsEmail, IsOptional } from 'class-validator';

export class FindUserDto {
  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'The email address seems to be invalid.',
    },
  )
  email?: string;
}
