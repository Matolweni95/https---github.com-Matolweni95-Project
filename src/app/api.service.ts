import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  redirectUrl: string | undefined;
  baseUrl:string = "http://localhost:8080/FinalProj/php";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient : HttpClient) { }

  
  public userlogin(username: any, password: any) {
  alert(username)
  return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
  .pipe(map(Users => {
  this.setToken(Users[0].name);
  this.setTokens(Users[0].role);
  this.setToken3(Users[0].parentId);
  
  this.getLoggedInName.emit(true);
  return Users;
  }));
  }

  public parentProfile(name: any, surname: any, cellno: any, email: any, line1: any, line2: any, city: any, zip: any) {
    return this.httpClient.post<any>(this.baseUrl + '/parent/parentProfile.php', {name, surname, cellno, email, line1, line2, city, zip })
    .pipe(map(Users => {
    return Users;
    }));
    }

  public userregistration(
    parentName: any,
    parentSurname: any,
    parentEmailAddress: any, 
    parentContactNo:any,
    firstLineAddress:any ,
    secondLineAddress: any, 
    thirdLineAddress:any,
    zip:any,
    occupation:any,
    emergencyName:any,
    emergencySurname:any,
    emergencyContactNo:any,
    emergencyEmailAddress:any,
    emergencyOccupation:any,
    emergencyLine1Address:any,
    emergencyLine2Address:any,
    emergencyLine3Address:any,
    emergencyZip:any,
    childName:any,
    childSurname:any,
    dateOfBirth:any,
    childDiertaryRestriction:any,
    allergies:any,progam:any,
    additionalprograms:any) {

  return this.httpClient.post<any>(this.baseUrl + '/parent/parent_child_application.php', { 
    parentName,parentSurname,
    parentEmailAddress,
    parentContactNo,
    firstLineAddress,
    secondLineAddress, 
    thirdLineAddress,zip,
    occupation,
    emergencyName,
    emergencySurname,
    emergencyContactNo,
    emergencyEmailAddress,
    emergencyOccupation,
    emergencyLine1Address,
    emergencyLine2Address,
    emergencyLine3Address,
    emergencyZip,childName,
    childSurname,dateOfBirth,
    childDiertaryRestriction,
    allergies,
    progam,
    additionalprograms
  })
  .pipe(map(Users => {
  return Users;
  }));
  }

  public profileUpdate (name: any,surname: any, cellno:any ,email: any,line1: any, line2:any, city:any, zip:any) {
    return this.httpClient.post<any>(this.baseUrl + '/update.php', { name,surname,cellno, email, line1, line2, city,zip })
    .pipe(map(Users => {
    return Users;
    }));
    }

    
  public getFunding (centre: any, amount: any ) {
    return this.httpClient.post<any>(this.baseUrl + '/Manager/funding.php', { centre, amount })
    .pipe(map(Users => {
    return Users;
    }));
    }

  public insertAssign (classname: any, tid:any ) {
    return this.httpClient.post<any>(this.baseUrl + '/Manager/assignToClass.php', { classname, tid })
    .pipe(map(Users => {
    return Users;
    }));
    }

    public insertFees (desc: any, fees:any, year:any, classes:any, venue:any  ) {
      return this.httpClient.post<any>(this.baseUrl + '/Manager/insertFees.php', { desc, fees, year, classes, venue })
      .pipe(map(Users => {
      return Users;
      }));
    }

    public editFees (fees: any, desc:any, id:any, classes:any, venue:any  ) {
      return this.httpClient.post<any>(this.baseUrl + '/Manager/UpdateFees.php', { fees, desc, id, classes, venue })
      .pipe(map(Users => {
      return Users;
      }));
    }

  public getLearners(id: number) {
    return this.httpClient.get<any>(this.baseUrl + '/fetchLearners.php?id='+ id)
      .pipe(map(Users => {
        return Users;
      }));
  }

  public getTeacherProfile(id: number) {
    return this.httpClient.get<any>(this.baseUrl + '/Manager/fetchTeacherProfile.php?id='+ id)
      .pipe(map(Users => {
        return Users;
      }));
  }

  public getTeacherName(id: number) {
    return this.httpClient.get<any>(this.baseUrl + '/Manager/getTeacherName.php?id='+ id)
      .pipe(map(Users => {
        return Users;
      }));
  }

  public getChild(id: number) {
    return this.httpClient.get<any>(this.baseUrl + '/Manager/fetchChild.php?id='+ id)
      .pipe(map(Users => {
        return Users;
      }));
  }

  
  //token
  setToken(token: string) {
  localStorage.setItem('token', token);
  }

  setTokens(token1: string) {
    localStorage.setItem('token1', token1);
  }

  setToken3(token3: string) {
    localStorage.setItem('token3', token3);
  }
  getToken() {
  return localStorage.getItem('token');
  }
  deleteToken() {
  localStorage.removeItem('token');//name
  localStorage.removeItem('token1');//role
  localStorage.removeItem('token3');//parentid
  localStorage.removeItem('token4');//teacherid
  localStorage.removeItem('token5');//feeid
  localStorage.removeItem('token6');//childId
  localStorage.removeItem('token7');//notification
  localStorage.removeItem('token8');//test

  }
  isLoggedIn() {
  const usertoken = this.getToken();
  if (usertoken != null) {
  return true
  }
  return false;
  }
  }