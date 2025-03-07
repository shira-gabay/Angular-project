import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';     // מייבא את HttpClient שמאפשר לבצע קריאות HTTP
import { BehaviorSubject, Observable, tap } from 'rxjs'; 
import { User } from '../types/user';
import { Console, log } from 'node:console';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  token:string='';
  currentUser: User = {id:0, name: '', email: '', password: '', role: '',courses:[]}; // משתנה שמכיל את המשתמש הנוכחי
  private apiUrl = 'http://localhost:3000/api';
   constructor(private http: HttpClient) { }

   getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }


createUser(userData: any): Observable<any> {
alert("add")
 console.log(this.currentUser);
  const res:any= this.http.post(`${this.apiUrl}/auth/register`, userData).pipe
  (tap((res:any)=>{
  this.currentUser=userData;
  this.currentUser.id=res.userId;
  console.log(this.currentUser.name);
  this.token=res.token;
  console.log(this.token);
   }))
  return res;
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getUserById(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const res= this.http.get<User>(`${this.apiUrl}/users/${this.currentUser.id}`, { headers }).pipe(
      tap(
        res=>this.currentUser=res
      )
    );
    return res
  }

  loginUser(email:string,password:string): Observable<any> {
    const res:any= this.http.post(`${this.apiUrl}/auth/login`,{email,password}).pipe
    (tap((res:any)=>{
    this.currentUser.email=email;
    this.currentUser.password=password;
    this.currentUser.id=res.userId;
    this.token=res.token;
    }))
    return res;
  }


}
