import { Controller,Post,Get,Body,Param,Session } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signin(){

  }

  @Post('/signup')
  signup(){

  }

  @Get()
  signout(){

  }

  @Get('/currentuser')
  getCurrentUser(){
    
  }

}
