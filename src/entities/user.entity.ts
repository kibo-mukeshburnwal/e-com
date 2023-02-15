

//how it will be representred in d db

export enum USER_TYPE{
    "admin"="admin",
    "vendor"="vendor",
    "customer"="customer"
}
export interface User{
    userId?:string;
    firstName:string;
    lastName:string;
    mobileNo:string;
    email:string;
    userType:USER_TYPE;
    createdOn:number
    enabled:boolean;
    password?:string;
    refreshToken?:string
}