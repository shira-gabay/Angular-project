import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../servies/cours.service';
import { Course } from '../../types/user';
import { UserService } from '../../servies/user.service';
import { log } from 'node:console';
import { AddCoursComponent } from "../add-cours/add-cours.component";
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update-course/update.component';
@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [AddCoursComponent],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent implements OnInit{
  currentCourses:Course[] = [];
  
  constructor(private coursService:CoursService,private userServise:UserService,private dialog: MatDialog) { 
    console.log("constructor");
    this.getCourses();
    console.log(this.coursService.getAllCourses());
    
  }
    ngOnInit(): void {
      this.getCourses();
    }
  
  createCourse(course: Course): void {
    this.coursService.createCourse(course).subscribe((res: any) => {
      //this.currentCourses.push(res);
      this.getCourses();
    });
  }
  getCourses():void{
    console.log("get courses");
    
      this.coursService.getAllCourses().subscribe((res:any) => {
        console.log("reasdfghj",res);
        
        this.currentCourses = res;});
    }
    join(courseId: number): void {
      console.log("im in joinnnnnnnnnnnn");
      
      const userId:number=this.userServise.currentUser.id;
      console.log(userId);
     console.log(courseId);
     
      
      
      this.coursService.joinCourse(courseId,userId).subscribe((res: any) => {
        console.log('Joined course:', res);
      
      });
    }
    exit(courseId: number): void {
      const userId: number = this.userServise.currentUser.id;
      // שינוי: קריאה לפונקציה exitCourse במקום deleteCourse
      this.coursService.exitCourse(courseId, userId).subscribe((res: any) => {
        console.log('Exited course:', res);
      });
    }
    
    trackByCourse(index: number, course: Course): number {
      return course.id; // ודאי שהמזהה נכון
    }
    openAddCourseDialog(): void {
      const dialogRef = this.dialog.open(AddCoursComponent, {
        width: '400px'
        
      });
      
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The add course dialog was closed', result);
        if (result) {
          // אם נדרש, ניתן לרענן את רשימת הקורסים
          this.getCourses();
        }
      });
      

    }
    openUpdateCourseDialog(course: Course,id:number): void {
      const dialogRef = this.dialog.open(UpdateComponent, {
        width: '400px',
        data: { ...course,id },
       });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log('The update course dialog was closed', result);
        if (result) {
          // רענון רשימת הקורסים לאחר עדכון
          this.getCourses();
        }
      });
    }
    deleteCourse(id: number): void {
      this.coursService.deleteCourse(id).subscribe(
        (res: any) => {
          console.log('Deleted course:', res);
          const index = this.coursService.courses.findIndex(course => course.id === id);
          if (index !== -1) {
            // הסרת הקורס מהמערך
            this.coursService.courses = [
              ...this.coursService.courses.slice(0, index),
              ...this.coursService.courses.slice(index + 1)
            ];
          }
          this.getCourses();
        },
        (error) => {
          console.error('Error deleting course:', error);
        }
      );
    }
    
    
}
