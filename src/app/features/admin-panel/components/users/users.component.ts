import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { userInfo } from '../../../../core/Models/Auth/auth';
import { environment } from '../../../../../enviroments/env';
import { ModalService } from '../../../../core/service/modal.service';
import { UserDetailsComponent } from './user-details/user-details.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: userInfo[] = [];
  totalCount = 0;
  loading = false;
  searchText:string=""
  private subs = new Subscription();
  protected imgUrl=environment.imagesURL 

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private modalService:ModalService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(searchText?:string): void {
    this.loading = true;
    const sub = this.userService.getUsers().subscribe({
      next: res => {
        this.users = res.data;
        if(searchText){

          this.users=this.users.filter(
            e=>e.displayName.toLowerCase().includes(searchText.toLowerCase())||
            e.email.toLowerCase().includes(searchText.toLowerCase())||
            e.userName.toLowerCase().includes(searchText.toLowerCase())
          
          
          
          )
        }
        this.totalCount = res.count;
        this.loading = false;
        console.log(res)
        console.log(this.users)
      },
      error: (err) => {
        this.snackBar.open('Failed to load users.', 'Close', { duration: 3000 });
        this.loading = false;
        console.log(err)
      }
    });
    this.subs.add(sub);
  }

  onSearchChange(){
    this.loadUsers(this.searchText)
  }


  toggleLock(user: userInfo): void {
    const action = user['locked'] ? 'unlockUser' : 'lockUser';
    const obs = (user['locked'])
      ? this.userService.unlockUser(user.id)
      : this.userService.lockUser(user.id);

    this.loading = true;
    const sub = obs.subscribe({
      next: () => {
        this.snackBar.open(
          user['locked'] ? 'User unlocked' : 'User locked',
          'Close',
          { duration: 2000 }
        );
        // update locally without full reload:
        user['locked'] = !user['locked'];
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Operation failed.', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
    this.subs.add(sub);
  }

  setIdToGetUser(userId:string){
    this.userService.userId.next(userId)
    this.modalService.open(UserDetailsComponent,{
      
      width:'800px'
    })
  

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
