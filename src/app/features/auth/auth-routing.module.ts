import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ForgetPasswordComponent } from "./components/forget-pass/forget-pass.component";
import { ResetPasswordComponent } from "./components/forget-pass/reset-pass/reset-pass.component";
import { PanerComponent } from "../../layout/get-start-layout/paner/paner.component";

const routes:Routes=[
   
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'forgetPass',
        component:ForgetPasswordComponent
    },
    {
        path:'resetPass',
        component:ResetPasswordComponent
    },
    

]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AuthRouting{}