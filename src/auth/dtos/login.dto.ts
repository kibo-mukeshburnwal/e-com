import {IsEmail,Length,IsMobilePhone, IsEmpty, IsNotEmpty} from 'class-validator'
export class LoginDTO{
    
   
    email?:string;

    mobileNo?:string;
    
    
    @Length(6)
    password:string;


}