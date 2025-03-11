import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonService } from '../../servies/lesson.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-lesson-modal',
  imports: [MatSelectModule,ReactiveFormsModule],
  templateUrl: './add-lesson-modal.component.html',
  styleUrl: './add-lesson-modal.component.css'
})
export class AddLessonModalComponent implements OnInit {
  addLessonForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private lessonService: LessonService,
    public dialogRef: MatDialogRef<AddLessonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: number }
  ) {
  
    this.addLessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }


  submitLesson(): void {
    if (this.addLessonForm.valid) {
      const lessonData = this.addLessonForm.value;
      const courseId = this.data.courseId;
      this.lessonService.createLesson(courseId, lessonData).subscribe(
        (response) => {
          console.log('Lesson created successfully:', response);
          
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error creating lesson:', error);
          alert('Error creating lesson');
        }
      );
    } else {
      this.addLessonForm.markAllAsTouched();
    }
  }

 
  closeAddLessonModal(): void {
    this.dialogRef.close();
  }
}
