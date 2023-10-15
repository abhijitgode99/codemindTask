import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  public createAccount !: FormGroup;

  constructor(private formBulider : FormBuilder,private http : HttpClient,private router: Router) { }

  ngOnInit() {
    this.createAccount = this.formBulider.group({
      email:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }
  newAccount(){
      this.http.post<any>("http://localhost:3000/createAccount",this.createAccount.value)
      .subscribe(res=>{
          alert("Account created, Succesfully!")
          this.createAccount.reset();
          this.router.navigate(['login']);
      },err=>{
        alert("something is wrong")
      })
  }

}
