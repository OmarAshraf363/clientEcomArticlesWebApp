import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent implements OnInit {
isToggele:boolean=false
userData:any={}
constructor(private authService:AuthService) { }
ngOnInit(): void {
  this.authService.userData.subscribe((res)=>{
    this.userData = res;
  })
 

}
toggeleView(){
console.log("clicked")
  this.isToggele = !this.isToggele;
  
}

hideenThings(){
  
}
}
