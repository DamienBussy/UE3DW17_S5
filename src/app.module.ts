import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
      AuthModule,
      UsersModule,
      ConfigModule.forRoot(),
      MongooseModule.forRoot('mongodb://localhost/nest')
    ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
