import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursService } from '../../servies/cours.service';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../servies/user.service';
import { Course } from '../../types/user';
@Component({
  selector: 'app-add-cours',
  imports: [MatSelectModule,ReactiveFormsModule],
  templateUrl: './add-cours.component.html',
  styleUrl: './add-cours.component.css'
})
export class AddCoursComponent implements OnInit{
  addCourseForm!: FormGroup;

  constructor(private fb: FormBuilder, private coursService: CoursService,private userService:UserService) {
    // יצירת הטופס עם שדות "title" ו-"description"
    this.addCourseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]

    });
  }

  ngOnInit(): void {}
  getCourses(): void {
    this.coursService.getAllCourses().subscribe((res: any) => {
      console.log("Courses received:", res);
      this.coursService.currenrCours = res;
    });
  }
  onSubmit(): void {
    if (this.addCourseForm.valid) {
      if (this.userService.currentUser.role === "teacher") {
        this.coursService.createCourse(this.addCourseForm.value).subscribe(
          (res: any) => {
            console.log('Course created successfully:', res);
            
            const newCourse:Course = {
              ...this.addCourseForm.value,
              teacherId:this.userService.currentUser.id 
            };
            this.coursService.currenrCours = newCourse;
            console.log('New course:', newCourse);
            
            
            this.coursService.courses.push(newCourse);
            this.addCourseForm.reset();
            alert('Course created successfully!');
          },
          (error) => {
            console.error('Error creating course:', error);
            alert('Error creating course');
          }
        );
      } else {
        alert("You are not a teacher");
      }
    } else {
      this.addCourseForm.markAllAsTouched();
    }
  }
  
}
