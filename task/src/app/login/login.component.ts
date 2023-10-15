import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  name : string;
  // @Output() dataEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBulider : FormBuilder, private http: HttpClient,private router: Router) {
    // const data = this.name;
    // this.dataEvent.emit(data);
   }
  
  ngOnInit(){
    this.loginForm = this.formBulider.group({
      email:['', Validators.required],
      password:['',Validators.required]
    })
  }
    login(){
      if(this.loginForm.valid){
      this.http.get<any>("http://localhost:3000/createAccount")
      .subscribe(res=>{
        const user=res.find((a:any)=>{
          console.log(this.loginForm.value.email);

          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password

        });
        if(user){
          this.name=this.loginForm.value.email
          console.log('this.loginForm.value.email')
          alert('login Succesfully');
          this.loginForm.reset();
          this.router.navigate(['homePage'])

        }else{
          console.log(user);
          alert("User not found")
        }
      })
    }
  }
  }
