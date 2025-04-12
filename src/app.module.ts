import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CategoriesModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          database: configService.get('DB_NAME'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_KEY'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
