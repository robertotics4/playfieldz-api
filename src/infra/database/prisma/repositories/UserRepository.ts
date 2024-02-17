import { IMapper, IUserRepository, User } from '@/domain';
import { PrismaClient, User as UserModel } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject('PrismaClient') private prismaClient: PrismaClient,
    @inject('UserMapper') private userMapper: IMapper<UserModel, User>,
  ) {}

  async create(data: Omit<User, 'id'>): Promise<User> {
    const created = await this.prismaClient.user.create({
      data,
    });

    return this.userMapper.convert(created);
  }

  async findOne(filters: Partial<User>): Promise<User | null> {
    const user = await this.prismaClient.user.findFirst({
      where: filters,
    });

    if (user === null) {
      return null;
    }

    return this.userMapper.convert(user);
  }

  async list(): Promise<User[]> {
    const users = await this.prismaClient.user.findMany({});

    return users.map(user => this.userMapper.convert(user));
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const updated = await this.prismaClient.user.update({
      where: { id },
      data,
    });

    return this.userMapper.convert(updated);
  }

  async delete(id: string): Promise<boolean> {
    await this.prismaClient.user.delete({
      where: { id },
    });

    return true;
  }
}
