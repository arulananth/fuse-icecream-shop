import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { config } from '@/_models/constants/config'; 
import { AppSession } from '@/_models/app-session';
import { LoopBackAuth } from '@/sdk/services';
import {SDKToken } from '@/sdk/models/BaseModels';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<SDKToken>;
  private loginUrl =  config.apiUrl + 'CustomUsers/login';
  private logoutUrl = config.apiUrl + 'CustomUsers/logout';

  constructor(
    private http: HttpClient,
    private auth: LoopBackAuth) {
    this.currentUserSubject = new BehaviorSubject<SDKToken>(JSON.parse(null));
  }

  saveApplication(appSession:SDKToken){
    sessionStorage.setItem('app-session',JSON.stringify(appSession));
  }

  getApplication(){
    const session = sessionStorage.getItem('app-session');
    return JSON.parse(session);
  }

  login(user:any): Observable<SDKToken> {
  	return this.http.post<SDKToken>(this.loginUrl, user, httpOptions).pipe(
  		tap((appSession: SDKToken) => { 
        this.saveApplication(appSession);
        this.currentUserSubject.next(appSession);
        appSession.rememberMe = true;
        this.auth.setToken(appSession);
  		})
  	);
  }
  clearSession(){
    sessionStorage.clear();
  }

  logout(accessToken:string): Observable<any> {
    let headers = new HttpHeaders();
    headers  = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', accessToken);
  	return this.http.post<any>(this.logoutUrl,{headers,params}).pipe(
  		tap(() => { 
        this.clearSession();
  			this.currentUserSubject.next(null);
  		})
  	);
  }

} 

