import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursService } from '../../servies/cours.service';
import { UserService } from '../../servies/user.service';
import { Course } from '../../types/user';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { log } from 'console';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [MatSelectModule,MatButtonModule, MatDividerModule, MatIconModule,MatFormFieldModule,MatInputModule,MatDialogModule,ReactiveFormsModule,ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'] 
})
export class UpdateComponent implements OnInit {
 
 

  updateForm!: FormGroup; 
  constructor(
    private fb: FormBuilder,
    private coursService: CoursService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
  

    console.log('Received data:', this.data);
  }

  ngOnInit(): void {
  
    this.updateForm = this.fb.group({
      title: [this.data?.title || '', Validators.required],  
      description: [this.data?.description || '', Validators.required], 
    });
    this.getCourses();
    
  }

  getCourses(): void {
    this.coursService.getAllCourses().subscribe((res: any) => {
      console.log("Courses received:", res);
      this.coursService.courses = res;
    });
  }

  onSubmit(): void {
 
    if (this.updateForm.valid) {
      if (this.userService.currentUser.role === "teacher") {
        console.log('Form Value:', this.updateForm.value);
        console.log('Course ID:', this.data.id);
        this.coursService.currenrCours.id = this.data.id;
        this.coursService.currenrCours.description = this.updateForm.value.description;
        this.coursService.currenrCours.title = this.updateForm.value.title;
        this.coursService.currenrCours.teacherId = this.userService.currentUser.id;
        this.coursService.updateCourse(this.coursService.currenrCours.id,this.coursService.currenrCours).subscribe(
          (res: any) => {
            console.log('Course updated successfully:', res);

            const index = this.coursService.courses.findIndex(course => course.id === this.coursService.currenrCours.id);
            if (index !== -1) {
              // עדכון מערך הקורסים עם רפרנס חדש
              this.coursService.courses = [
                ...this.coursService.courses.slice(0, index),
                this.updateForm.value,
                ...this.coursService.courses.slice(index + 1)
              ];
            }

            this.cdr.detectChanges();
         
            this.updateForm.reset();
            alert('Course updated successfully!');
          },
          (error) => {
            console.error('Error updating course:', error);
            alert('Error updating course');
          }
        );
      } else {
        alert("You are not a teacher");
      }
    } else {
     
      this.updateForm.markAllAsTouched();
    }
  }
  // onSubmit(): void {
  //   if (this.data.valid) {
  //     if (this.userService.currentUser.role === "teacher") {
  //       console.log('mko',this.data);
  //       console.log('hij,om',this.data.id);
        
  //     //  this.coursService.currenrCours.id=this.data.id;
  //     //   this.coursService.currenrCours.description=this.data.value.description;
  //     //   this.coursService.currenrCours.title=this.data.value.title;
  //     //   this.coursService.currenrCours.teacherId=this.userService.currentUser.id;
  //     //   console.log('Updating course:', this.data.value);
  //     //   console.log('Course ID:', this.userService.currentUser.id);
  //     //   console.log('current course:', this.coursService.currenrCours);
        
  //     //   // קריאה לעדכון הקורס: מעבירים את מזהה הקורס ואת העדכונים מהטופס
  //     //   this.coursService.updateCourse(  this.userService.currentUser.id, this.data.value).subscribe(
  //     //     (res: any) => {
  //     //       console.log('Course updated successfully:', res);
  //     //       // עדכון רשימת הקורסים המקומית: לדוגמה, עדכון הקורס במערך
  //     //       const index = this.coursService.courses.findIndex(course => course.id === this.coursService.currenrCours.id);
  //     //       if (index !== -1) {
  //     //         this.coursService.courses[index] = { ...this.coursService.courses[index], ...this.coursService.currenrCours };
  //     //       }
  //     //       this.data.reset();
  //     //       alert('Course updated successfully!');
  //     //     },
  //     //     (error) => {
  //     //       console.error('Error updating course:', error);
  //     //       alert('Error updating course');
  //     //     }
  //     //   );
  //     } else {
  //       alert("You are not a teacher");
  //     }
  //   } else {
  //     this.data.markAllAsTouched();
  //   }
  // }
}
