import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const finUser = await this.userRepo.findOne({
      where: {
        username: createUserDto.username,
      },
    });
    if (finUser) throw new BadRequestException('user all ready existed');
    const user = this.userRepo.create(createUserDto);
    const userData = await this.userRepo.save(user);

    return userData;
  }
  async login(data: CreateUserDto) {
    const user = await this.userRepo.findOne({
      where: { username: data.username },
    });
    if (!user) throw new BadRequestException('user not found');
    const token = this.jwtService.sign({ user_id: user.id });
    return token;
  }
  async profile(user: any) {
    const findUser = await this.userRepo.findOne({
      where: { username: user.username },
    });
    if (!user) throw new BadRequestException('user not found');
    return findUser;
  }
}
