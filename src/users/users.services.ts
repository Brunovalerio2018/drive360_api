import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(params: { name: string; email: string; password: string }): Promise<User> {
    const normalizedEmail = params.email.toLowerCase().trim();
    const exists = await this.usersRepository.exists({ where: { email: normalizedEmail } });

    if (exists) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }

    const passwordHash = await bcrypt.hash(params.password, 12);
    const user = this.usersRepository.create({
      name: params.name.trim(),
      email: normalizedEmail,
      passwordHash,
    });

    return this.usersRepository.save(user);
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email: email.toLowerCase().trim() })
      .getOne();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}