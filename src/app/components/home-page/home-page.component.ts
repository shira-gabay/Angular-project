import { Component } from '@angular/core';
import { UserService } from '../../servies/user.service';
import { Course } from '../../types/user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  currentCourses:Course[] = [];
constructor(userServise:UserService,private router:Router) { }

nevigateCourse():void{
 this.router.navigate(['/all-courses']);
}
}
