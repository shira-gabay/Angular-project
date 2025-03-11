import { Component, Inject, Input, OnInit } from '@angular/core';
import { LessonService } from '../../servies/lesson.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllCoursesComponent } from '../all-courses/all-courses.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../servies/user.service';
import { Lesson } from '../../types/user';
import { AddLessonModalComponent } from '../add-lesson-modal/add-lesson-modal.component';
import { UpdateComponent } from '../update-course/update.component';
import { UpdateLessonComponent } from '../update-lesson/update-lesson.component';
import { DetailsLessonComponent } from '../details-lesson/details-lesson.component';

@Component({
  selector: 'app-lesson-list-modal-component',
  imports: [],
  templateUrl: './lesson-list-modal-component.component.html',
  styleUrl: './lesson-list-modal-component.component.css'
})
export class LessonListModalComponentComponent implements OnInit {
  @Input() courseId!: number;
  lessons: any[] = [];
  addLessonForm!: FormGroup;
  showLessonList: boolean = false;
  coursId: number = 0;

  constructor(private fb: FormBuilder, private lessonService: LessonService, public dialogRef: MatDialogRef<AllCoursesComponent>, @Inject(MAT_DIALOG_DATA) public data: { courseId: number }, public userService: UserService, private dialog: MatDialog) {
    this.addLessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getLessons();

    this.coursId = this.data.courseId;
  }

  getLessons(): void {
    console.log("a");

    this.lessonService.getLessons(this.data.courseId).subscribe(
      (data) => {
        this.lessons = data;
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }

  updateLesson(lessonId: number, updatedLesson: any): void {
    this.lessonService.updateLesson(this.courseId, lessonId, updatedLesson).subscribe(
      (data) => {
        const index = this.lessons.findIndex(lesson => lesson.id === lessonId);
        if (index !== -1) {
          this.lessons[index] = data;
        }
      },
      (error) => {
        console.error('Error updating lesson:', error);
      }
    );
  }
  DeleteLesson(lessonId: number): void {
    this.lessonService.deleteLesson(this.courseId, lessonId).subscribe(
      () => {
        this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);
      },
      (error) => {
        console.error('Error deleting lesson:', error);
      }
    );
  }

  openAdLessoneDialog(): void {
    window.history.pushState({}, '', '/:'+this.data.courseId+'/add-lesson:/'); 
  
    const dialogRef = this.dialog.open(AddLessonModalComponent, {
      width: '400px',
      data: { courseId: this.data.courseId }



    });
    dialogRef.afterClosed().subscribe(() => {
      window.history.pushState({}, '', '/lessons:/'+this.data.courseId); 
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The add course dialog was closed', result);
      if (result) {
      
        this.getLessons();
      }
    });
  }
  updateLessonDialog(currentlesson: Lesson): void {
    window.history.pushState({}, '', '/:'+this.data.courseId+'/update-lesson:/'+currentlesson.lessonId); 
  
    const dialogRef = this.dialog.open(UpdateLessonComponent, {
      width: '400px',
      data: { ...currentlesson, courseId: this.data.courseId }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateLesson(currentlesson.lessonId, result);
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      window.history.pushState({}, '', '/lessons:/'+this.data.courseId); 
    });
  }
  addLesson(courseId: number): void {
    this.showLessonList = !this.showLessonList;
    if (this.addLessonForm.valid) {
      if (this.userService.currentUser.role === "teacher") {
        this.lessonService.createLesson(courseId, this.addLessonForm.value).subscribe(
          (res: any) => {
            console.log('Course created successfully:', res);

            const newLesson: Lesson = {
              ...this.addLessonForm.value,
              courseId: this.userService.currentUser.id
            };
            this.lessonService.currenrLesson = newLesson;
            console.log('New course:', newLesson);


            this.lessonService.lessons.push(newLesson);
            this.addLessonForm.reset();
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
      this.addLessonForm.markAllAsTouched();
    }
  }

  getLessonAllDialog(title: string, content: string): void {
    const dialogRef = this.dialog.open(DetailsLessonComponent, {
      width: '400px',
      data: {title, content}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getLessons();
      }
    });
  }
}


