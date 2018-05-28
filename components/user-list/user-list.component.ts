import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../service/user-service.service';
import { User } from '../../../models/user.class';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public userList : User[];

  constructor(
    public userService : UserServiceService,
    public _router : Router,
    public _activatedrouter : ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.userService.GetAllUser().subscribe( data => {
      this.userList = data;
    }, err =>{
      this.userService.handelError(err);
    });
  }
  // ngOnDestroy(): void {
  //   if(this.subscription){
  //     this.subscription.unsubscribe();
  //   }
  // }
}
