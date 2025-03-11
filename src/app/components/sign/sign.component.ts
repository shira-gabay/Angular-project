import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-sign',
  imports: [MatInputModule,MatSelectModule,MatDialogModule,ReactiveFormsModule],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.css'
})
export class SignComponent {
showForm:boolean = false;
signInForm!:FormGroup;
errorMsg: string = '';
successMsg: string = '';
@Output() signSubmit = new EventEmitter<any>();
constructor(private formBuilder:FormBuilder) { 
  this.signInForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', [Validators.required]]
  });
}
onSubmit(): void {
  console.log("on submit");
  this.signSubmit.emit(this.signInForm.value);
}
chekSubmit():void{
  this.showForm = true;
  console.log("true");
}
get valid():{[key:string]:AbstractControl}
{
  return this.signInForm.controls;
}
cheklogin():void{
  this.showForm=false;
}
}
