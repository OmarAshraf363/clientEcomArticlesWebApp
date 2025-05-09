import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/service/auth.service';
import { ModalService } from '../../../../core/service/modal.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup;
  subs:Subscription=new Subscription()
  constructor(private fb: FormBuilder, private authService: AuthService,private modal:ModalService,private router:Router ) {
   this.loginForm = this.fb.group({
     email: ['', Validators.required],
     password: ['', Validators.required]
   });

 }
 onSubmit() {
   if(!this.loginForm.valid){
      return;
   }
    const formData = this.loginForm.value;
    console.log('Form Data:', formData);
    //calling api 
  let loginSub=this.authService.login(formData).subscribe({
    next: (res) => {
      this.authService.isLoggedIn.next(true);
      localStorage.setItem('isLogged', true.toString());
    let getUserDataSub=  this.authService.getUser().subscribe(data=>{
        this.authService.userData.next(data)
      })
      this.subs.add(loginSub)
      this.subs.add(getUserDataSub)
      this.modal.closeAll()
    
    },
    error: (error) => {
      console.error('Login failed', error);
    }
  })
      


 }
 ngOnDestroy(): void {
   this.subs.unsubscribe()
 }
}
