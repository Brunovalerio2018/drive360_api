import { Controller, Get, Param, ParseUUIDPipe, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UsersService } from './users.services';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Retorna o perfil do usuário autenticado' })
  getMe(@Req() req: Request & { user: { userId: string } }) {
    return this.usersService.findById(req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista usuários cadastrados' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca usuário por ID' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findById(id);
  }
}