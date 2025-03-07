import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from "../../servies/user.service"
import { User } from '../../types/user';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { HomePageComponent } from "../home-page/home-page.component";
@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule, HomePageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  isSend=false;
  isShow:boolean=false;
  showForm:boolean = false;
  loginInForm!:FormGroup;
  @Output() loginSubmit = new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder) { 
  this.loginInForm = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],  
  password: ['', [Validators.required, Validators.minLength(6)]]
 
  });
  }
  ngOnInit(): void {
  }
  onSubmit():void{
    this.loginSubmit.emit(this.loginInForm.value);
    this.isShow=true;
  }
  chekSubmit():void{
    this.showForm = true;
    console.log("true");
   
  }
  get valid():{[key:string]:AbstractControl}
  {
    return this.loginInForm.controls;
  }
  cheklogin():void{
    this.showForm=false;
    this.isSend=true;
  }
  }





