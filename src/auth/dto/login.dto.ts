import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'brunovaleriomachado2018@gmail.com' })
    @IsEmail()
    email!: string;

  @ApiProperty({ example: '123' })
    @IsString()
    @MinLength(8)
    password!: string;
}