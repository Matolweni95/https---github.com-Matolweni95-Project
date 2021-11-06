import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class Notification {
  constructor (public id: number, 
              public title: string,
              public message: string){
            }}
  
@Component({
  selector: 'app-financial-approval',
  templateUrl: './financial-approval.component.html',
  styleUrls: ['./financial-approval.component.css']
})
export class FinancialApprovalComponent implements OnInit {
  angForm!: FormGroup;
  notifications:any[] = [];

  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router, private http: HttpClient) {

    this.angForm = this.fb.group({
      email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]
      });

   }

   getNotifs(){
    this.http.get<any>('http://localhost/angularproj/php/fetchNotifs.php').subscribe(
      response => {
        console.log(response);
        this.notifications = response;
      }
    )
  }

  

  ngOnInit(): void {
    this.getNotifs();
    this.getCentres();
  }

  getCentres() {
    this.http.get<any>('http://localhost/angularproj/php/regional/countCentres.php')
      .subscribe(results => {
        console.log(results);
      });
  }

  postdata(angForm1: { value: { email: any; password: any; }; })
  {
    this.dataService.userlogin(angForm1.value.email,angForm1.value.password)
    .pipe(first())
    .subscribe(
    data => {
    const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/dashboard';
    this.router.navigate([redirect]);
    },
    error => {
    alert("User name or password is incorrect")
    });
    }
    get email() { return this.angForm.get('email'); }
    get password() { return this.angForm.get('password'); }
    }