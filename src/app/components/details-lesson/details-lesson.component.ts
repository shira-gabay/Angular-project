
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
@Component({
  selector: 'app-details-lesson',
  imports: [MatCardModule],
  templateUrl: './details-lesson.component.html',
  styleUrl: './details-lesson.component.css'
})
export class DetailsLessonComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }
  ){}
}
