import { inject, Injectable } from '@angular/core';
import {  CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { ModalService } from '../service/modal.service';

export const AdminGaurd:CanActivateFn=()=>{
  const authService = inject(AuthService);
  const modalService = inject(ModalService);
  const router = inject(Router);
  let userRole:string=""
  authService.userRole$.subscribe(data=>{
    userRole=data
  })
  if(userRole=="Admin"){
    return true
  }else{
    return false
  }

}


 


