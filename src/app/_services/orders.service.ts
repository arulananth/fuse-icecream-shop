import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { config, Orders, orderStatus } from '@/_models'; 

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: new HttpParams()
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private currentUserSubject: BehaviorSubject<Orders>;
  private ordersAPI = config.apiUrl + 'Orders/';

  constructor(
  	private http: HttpClient) {
  }

  getOrders(accessToken:string): Observable<any[]> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams().set('access_token', accessToken);
  	return this.http.get<any[]>(this.ordersAPI, {headers, params}).pipe(
  		tap((orders: any) => { 
  			window.console.log(orders);
  		})
  	);
  }

  getOrderById(id: number, accessToken: string): Observable<any> {
    let orderByIdUrl = this.ordersAPI + id;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams().set('access_token', accessToken);
    return this.http.get<any>(orderByIdUrl, {headers, params}).pipe(
      tap(user => {
        console.log(user);
      })
    );
  }

} 

