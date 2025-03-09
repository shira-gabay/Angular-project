import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Course } from '../types/user';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = 'http://localhost:3000/api/courses';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();
  constructor(private http: HttpClient, private userServise: UserService) { }
  
  courses: Course[] = [];
  currenrCours: Course = { id: 0, title: "", description: "", teacherId: 0 };
  token: string = '';

  getAllCourses(): Observable<Course[]> {
    const res = this.http.get<Course[]>(this.apiUrl, {
      headers: { 'Authorization': `Bearer ${this.userServise.token}` }
    }).pipe(
      tap((response) => {
        this.courses = response;
        console.log("Response in service (getAllCourses):", response);
      })
    );
    return res;
  }
  
 
  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`, {
      headers: { 'Authorization': `Bearer ${this.userServise.token}` }
    }).pipe(
      tap((response: any) => {
        if (!this.userServise.currentUser.courses) {
          this.userServise.currentUser.courses = [];
        }
        this.userServise.currentUser.courses.push(response);
        console.log("Response in service (getCourseById):", response);
      })
    );
  }
  

  createCourse(courseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, courseData, {
      headers: { 'Authorization': `Bearer ${this.userServise.token}` }
    }).pipe(
      tap((res: any) => {
        console.log("Course created response:", res);
      })
    );
  }

  updateCourse(id: number, updates: Partial<Course>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updates, {
      headers: { 'Authorization': `Bearer ${this.userServise.token}` }
    });
  }
  

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: { 'Authorization': `Bearer ${this.userServise.token}` }
    }).pipe(
      tap(() => {
        // בדיקה אם currentUser.courses קיים, ואם לא - אתחול למערך ריק
        if (!this.userServise.currentUser.courses) {
          this.userServise.currentUser.courses = [];
        }
        this.userServise.currentUser.courses = this.userServise.currentUser.courses.filter(course => course.id !== id);
      })
    );
  }
  
  
  // רישום תלמיד לקורס
  joinCourse(courseId: number, userId: number): Observable<any> {
    console.log("joinCourse - courseId:", courseId, "userId:", userId);
    const body = { userId: userId };
    const res = this.http.post(`${this.apiUrl}/${courseId}/enroll`, body, {
      headers: { 'Authorization': `Bearer ${this.userServise.token}` }
    }).pipe(
      tap((response) => {
        console.log("Join response received");
        this.getCourseById(courseId).subscribe((res: any) => {
          console.log("Updated course details:", res);
          if (!this.userServise.currentUser.courses) {
            this.userServise.currentUser.courses = [];
          }
          this.userServise.currentUser.courses.push(res);
          console.log("Current user's courses:", this.userServise.currentUser.courses);
        }, error => {
          console.log("Error during join:", error);
          alert("לקורס זה הצטרפת");
        });
      })
    );
    return res;
  }
  
  // יציאה מהקורס (un-enroll) – נתיב שמוגדר בשרת כ־DELETE /:courseId/unenroll
  exitCourse(courseId: number, userId: number): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/${courseId}/unenroll`, {
      body: { userId: userId },
      headers: { 'Authorization': `Bearer ${this.userServise.token}` }
    });
  }
}
