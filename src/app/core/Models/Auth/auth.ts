export interface LoginReq{
    email:string;
    password:string
}
export interface RegisterRec{
    fullName:string
    displayName:string
    email:string;
    confirmPassword:string
    password:string
}
export class userInfo{
    id:string=""
    isLogged:boolean=false;
    displayName:string="";
    fullName:string="";
    email:string="";
    userName:string="";
    phoneNumber:string="";
    picImage:string="";
    role:string="";
    locked:boolean=false
}

export interface ResetPassword{
    newPassword:string;
    confirmNewPassword:string
    token:string
    email:string;

}

export class checkAuth{
    isAuth:boolean=false;
    role:string="";

}