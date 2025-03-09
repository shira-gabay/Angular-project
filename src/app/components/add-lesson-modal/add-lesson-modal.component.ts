import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonService } from '../../servies/lesson.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { log } from 'console';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-add-lesson-modal',
  imports: [MatSelectModule,MatButtonModule, MatDividerModule, MatIconModule,MatFormFieldModule,MatInputModule,MatDialogModule,ReactiveFormsModule,ReactiveFormsModule],
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
