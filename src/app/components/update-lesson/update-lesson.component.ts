import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursService } from '../../servies/cours.service';
import { UserService } from '../../servies/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LessonService } from '../../servies/lesson.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-update-lesson',
  imports: [ MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './update-lesson.component.html',
  styleUrl: './update-lesson.component.css'
})
export class UpdateLessonComponent {

  updateForm!: FormGroup; 
  constructor(
    private fb: FormBuilder,
    private coursService: CoursService,
    private userService: UserService,
    private lessonService: LessonService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, title: string, content: string, courseId: number }

  ) {
  

    console.log('Received data:', this.data);
  }

  ngOnInit(): void {
  
    this.updateForm = this.fb.group({
      title: [this.data?.title || '', Validators.required],  
      content: [this.data?.content || '', Validators.required], 
    });
    this.lessonService.getLessons(this.data.courseId);
   
    
  }



  onSubmit(): void {
 
    if (this.updateForm.valid) {
      if (this.userService.currentUser.role === "teacher") {
        console.log('Form Value:', this.updateForm.value);
        console.log('Course ID:', this.data.id);
        this.lessonService.currenrLesson.lessonId = this.data.id;
        this.lessonService.currenrLesson.courseId = this.data.courseId;
        this.lessonService.currenrLesson.content = this.updateForm.value.content;
        this.lessonService.currenrLesson.title = this.updateForm.value.title;
        console.log('Current LessonJHGFDGTYHUJK:', this.lessonService.currenrLesson);
        
        this.lessonService.updateLesson(this.lessonService.currenrLesson.courseId,this.lessonService.currenrLesson.lessonId,this.lessonService.currenrLesson).subscribe(
          (res: any) => {
            console.log('Lesson updated successfully:', res);

            const index = this.lessonService.lessons.findIndex(lesson => lesson.lessonId === this.lessonService.currenrLesson.lessonId);
            if (index !== -1) {
              // עדכון מערך הקורסים עם רפרנס חדש
              this.lessonService.lessons= [
                ...this.lessonService.lessons.slice(0, index),
                this.updateForm.value,
                ...this.lessonService.lessons.slice(index + 1)
              ];
            }
            this.cdr.detectChanges();
            this.updateForm.reset();
            alert('Lesson updated successfully!');
            this.lessonService.getLessons(this.data.courseId);
           
            
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

}
