export class CreateUserDTO{
    firstName:string;
    lastName:string;
    mobileNo:string;
    email:string;
    userType:USER_TYPE;
    enabled:boolean;
    password?:string;
    refreshToken?:string
    createdOn?:number
}
export enum USER_TYPE{
    "admin"="admin",
    "vendor"="vendor",
    "customer"="customer"
}