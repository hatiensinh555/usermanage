import { Component, OnInit,OnChanges,OnDestroy } from '@angular/core';
import { UserServiceService } from '../../../service/user-service.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Task } from '../../../models/task.class';
import { Quest } from '../../../models/quest.class';
import { User } from '../../../models/user.class';
import { Observable, Subscribable } from 'rxjs';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public tasks : Task[]=[];
  public quests : Quest[]=[];
  public user : User[];
  constructor(
		private _userService : UserServiceService,
		private _activatedRoute : ActivatedRoute,
		private _route : Router
  ) { }

  ngOnInit() {
    this.loadTask();
    this.getUserById();
  }
  OnBackList(){
     this._route.navigate(['/userlist'],{relativeTo : this._activatedRoute.parent});
  }
   loadTask(){
		this._activatedRoute.params.subscribe(x =>{
      let tmp = x.id
			this._userService.GetAllTask(tmp).subscribe( data => {
        this.tasks = data;
        // console.log(data)
				this.loadQuest(data);
			}, err =>{
				  console.log(err)	
			});
		 })     
  }

  loadQuest(task:Task[]){
    for(let i = 0;i< task.length;i++){
      this._userService.GetAllQuestById( task[i].userlistId,task[i].id).subscribe( data => {
         task[i].quest = data;
      }, err =>{
        console.log(err)
      });
    }
  }

  getUserById(){
    this._activatedRoute.params.subscribe( x => {
      // console.log(x)
      this._userService.getUserById(x.id).subscribe( data => {
        this.user = data;
        console.log(data);
      })
    });
  }

  onEditUser(id,name,code,level){
    let user = new User(id,name,code,level);
    console.log(user);
    this._userService.editUser(user).subscribe(data =>{});
  }

  onDeleteUser(id){
    this._userService.deleteUser(id).subscribe(data=>{});
    // this._route.navigate(['userlist']);
    this.OnBackList();
  }

}
