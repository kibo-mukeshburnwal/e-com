

//how it will be representred in d db

export enum USER_TYPE{
    "admin"="admin",
    "vendor"="vendor",
    "customer"="customer"
}
export interface User{
    id?:string;
    firstName:string;
    lastName:string;
    mobileNo:string;
    email:string;
    userType:USER_TYPE;
    isActive:boolean
    createdOn:number
    createdBy:string;
    enabled:boolean;
    password?:string;
    token?:string
}