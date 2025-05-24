import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  open(component: any, config: any = {}) {
    return this.dialog.open(component, {
      width:'600px',
      height:'500px' ,
      maxWidth:'100%',
      ...config,
      


      
    });
  }

  closeAll() {
    this.dialog.closeAll();
  }
}
