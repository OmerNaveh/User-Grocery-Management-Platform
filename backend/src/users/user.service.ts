import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './user.types';
import { validateDto } from 'src/helpers/validation';
import { normalizeAllUsersResponse } from 'src/helpers/normalize';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: ['carts', 'carts.items', 'carts.items.product'],
      order: { id: 'ASC' },
    });
    return normalizeAllUsersResponse(users);
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

    await this.usersRepository.save(userToUpdate);
    return this.usersRepository.findOne({ where: { id: Number(id) } });
  }

  async create(body: UpdateUserDto): Promise<User> {
    validateDto(body);
    // Find if user with the same name already exists
    const user = await this.usersRepository.findOne({
      where: { fullName: body.fullName },
    });
    if (user) {
      throw new BadRequestException(
        `User with name ${body.fullName} already exists`,
      );
    }
    const newUser = this.usersRepository.create(body);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async auth(body: { fullName: string }): Promise<User> {
    if (!body.fullName) {
      throw new BadRequestException(`Must provide a full name`);
    }
    const user = await this.usersRepository.findOne({
      where: { fullName: body.fullName },
    });
    if (!user) {
      throw new NotFoundException(`User with name ${body.fullName} not found`);
    }
    return user;
  }
}
