import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.class';
import { UserServiceService } from '../../../service/user-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public name : string;
  public code : string;
  public level : string;

  constructor(
    private _router : Router,
    private _userService : UserServiceService
  ) { }

  ngOnInit() {
  }
  onBackList(){
    this._router.navigate(['userlist']);
  }
  onAddUser(){
    if(this.name !='' && this.code!=''
      &&this.name !=null && this.code!=null&&this.level !='' && this.level!=null){
      let user = new User(null,this.name,this.code,this.level);
      console.log(user)
      this._userService.addUser(user).subscribe(data=>{});
      this.name='';
      this.code=null;
      this.level=null;
    }
    else return false;
  }
}
