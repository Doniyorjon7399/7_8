import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guards';
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const token = await this.usersService.create(createUserDto);
    return {
      message: 'succes',
    };
  }
  @Post('login')
  async login(
    @Body()
    createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.usersService.login(createUserDto);
    res.cookie('token', token, {
      httpOnly: true,
    });

    return {
      message: 'succes',
      token,
    };
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');

    return {
      message: 'succes',
    };
  }
  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const userData = await this.usersService.profile(user);
    return {
      message: 'succes',
      userData,
    };
  }
}
