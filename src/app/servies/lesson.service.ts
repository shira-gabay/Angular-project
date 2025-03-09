import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';
import { Lesson } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient,public userService:UserService) { }
 lessons: Lesson[] = [];
 currenrLesson: Lesson = { lessonId: 0, title: "", content: "", courseId: 0 };
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
 
  getLessons(courseId: number): Observable<any> {

   console.log(localStorage.getItem('token'));
  
  
   const res= this.http.get(`${this.apiUrl}/${courseId}/lessons`,
     {    headers: { 'Authorization': `Bearer ${this.userService.token}` }
    }).pipe(
      tap((response) => {
        
        console.log("Response in service (getAllCourses):", response);
      })
    );
    return res;;
  }

  getLesson(courseId: number, lessonId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`,
       { headers: this.getHeaders() });
  }

  createLesson(courseId: number, lessonData: any): Observable<any> {
    const res= this.http.post(`${this.apiUrl}/${courseId}/lessons`, lessonData,
      {    headers: { 'Authorization': `Bearer ${this.userService.token}` }
    }).pipe(
      tap((response) => {
        
        console.log("Response in service (getAllCourses):", response);
      })
    );
    return res;;
  }

  updateLesson(courseId: number, lessonId: number, lessonData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lessonData, { headers: this.getHeaders() });
  }

  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getHeaders() });
  }
}
