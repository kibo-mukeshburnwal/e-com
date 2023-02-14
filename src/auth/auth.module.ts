import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepo } from 'src/user/user.repo';

@Module({
  imports:[],
  controllers: [AuthController],
  providers: [AuthService,UserRepo]
})
export class AuthModule {}
