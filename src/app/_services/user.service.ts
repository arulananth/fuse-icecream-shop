import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, config, UserReport } from '@/_models';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  private url = config.apiUrl + 'CustomUsers/';
  private reportsUrl = 'get-customers-report';
  private userReportSubject: BehaviorSubject<Array<UserReport>> = new BehaviorSubject<Array<UserReport>>(JSON.parse(null));

  constructor(
    private http: HttpClient,
    private _loginService: LoginService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(null));
  }

  clearSession() {
    sessionStorage.clear();
  }

  getUserById(userId: Number, accessToken: string): Observable<User> {
    let customerUrl = this.url + userId;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', accessToken);
    return this.http.get<User>(customerUrl, { headers, params }).pipe(
      tap((user: User) => {
        const appSession = this._loginService.getApplication();
        appSession.user = user;
        this._loginService.saveApplication(appSession);
        this.currentUserSubject.next(user);
      })
    );
  }

  getOrderUserById(userId: Number, accessToken: string): Observable<User> {
    let customerUrl = this.url + userId;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', accessToken);
    return this.http.get<User>(customerUrl, { headers, params }).pipe(
      tap((user: User) => {
        console.log(user);
      })
    );
  }

  getAllUsers(): Observable<any> {
    let headers = this.constructHeaders();
    return this.http.get<any>(this.url, headers).pipe(
      tap(users => {
        console.log(users);
      })
    );
  }

  getAllUserReports(): Observable<Array<UserReport>> {
    const appSession = this._loginService.getApplication();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', appSession.id);
    let url = this.url + this.reportsUrl;
    return this.http.get<Array<UserReport>>(url, {headers,params}).pipe(
      tap((userReports:Array<UserReport>) => {
        this.userReportSubject.next(userReports);
      })
    );
  }

  constructHeaders(): any {
    const appSession = this._loginService.getApplication();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', appSession.id);
    return { headers, params };
  }

  logout(): void {

  }

}

