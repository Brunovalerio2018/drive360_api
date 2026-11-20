import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.services';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.usersService.createUser({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    return this.buildAuthResponse(user);
  }

  private async buildAuthResponse(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      token_type: 'Bearer',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}