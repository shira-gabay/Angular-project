import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ MatFormFieldModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  isSend=false;
  isShow:boolean=false;
  showForm:boolean = false;
  loginInForm!:FormGroup;
  @Output() loginSubmit = new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder, private router : Router

  ) { 
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





