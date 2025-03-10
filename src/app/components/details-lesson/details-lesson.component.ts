import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
@Component({
  selector: 'app-details-lesson',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './details-lesson.component.html',
  styleUrl: './details-lesson.component.css'
})
export class DetailsLessonComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }
  ){}
}
