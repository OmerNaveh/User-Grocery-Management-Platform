import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './user.types';
import { validateDto } from 'src/helpers/validation';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: Number(id) },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, body: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.usersRepository.findOne({
      where: { id: Number(id) },
    });

    if (!userToUpdate) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    validateDto(body);

    this.usersRepository.merge(userToUpdate, body);

    return await this.usersRepository.save(userToUpdate);
  }

  async create(body: UpdateUserDto): Promise<User> {
    validateDto(body);
    const newUser = this.usersRepository.create(body);
    return await this.usersRepository.save(newUser);
  }
}
