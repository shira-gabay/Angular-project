import { Component, OnInit } from '@angular/core';
import { UserService } from "../../servies/user.service"
import { User } from '../../types/user';
import { SignComponent } from "../sign/sign.component";
import { LoginComponent } from "../login/login.component";


import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  imports: [SignComponent, LoginComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  constructor(public userService: UserService,private router:Router) { }
  avattarletter: string = '';
  isLogin: boolean = false;
  userid: number = 0;
  namee: string = '';
  isSend: boolean = false;
  isLogin1:boolean=false;
  isSign1:boolean=false;
  ngOnInit() {
  }
  createUser(user: User): void {
    this.userService.createUser(user).subscribe((res: any) => {
      this.isLogin = true;
      this.avattarletter = this.userService.currentUser.name.charAt(0).toUpperCase();
      console.log(this.avattarletter);
    });
  }
  updateUser(userId: number): void {
    const updatedUser: Partial<User> = {
      name: 'Updated Name',
      email: 'updated@example.com',
      password: 'newpassword',
      role: 'user'
    };
    this.userService.updateUser(userId, updatedUser).subscribe(() => {

    });
  }
  handleSignSubmit(formData: User): void {
    this.createUser(formData)
    this.isLogin = true;
    
  }
  handleLoginSubmit(email: string, password: string): void {
    this.userService.loginUser(email, password).subscribe(() => {
      this.isLogin = true;
      this.userid = this.userService.currentUser.id;
      console.log(this.userid);
      this.userService.getUserById().subscribe(() => {

        this.avattarletter = this.userService.currentUser.name[0];

      });

      console.log(this.avattarletter);
    });
  }
  nevigateCourse():void{
    this.router.navigate(['/all-courses']);
   }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
}
}
