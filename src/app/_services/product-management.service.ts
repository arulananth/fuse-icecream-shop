import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { config } from '@/_models/constants/config';
import { Product,Option, ProductCategory, Addition } from '@/_models';
import { LoginService } from './login.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({    
  providedIn: 'root'
})
export class ProductManagementService {
  private getAllProductsForCategorySubject: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>(JSON.parse(null));
  private getAllOptionsForProductSubject: BehaviorSubject<Array<Option>> = new BehaviorSubject<Array<Option>>(JSON.parse(null));
  private getAllAdditionsForProductSubject: BehaviorSubject<Array<Addition>> = new BehaviorSubject<Array<Addition>>(JSON.parse(null));
  private productUrl = config.apiUrl + 'ProductCategories/';
  private optionsUrl = config.apiUrl + 'Products/';
  private saveOrUpdateProductSubject: BehaviorSubject<Product> = new BehaviorSubject<Product>(JSON.parse(null));
  private saveOrUpdateOptionSubject: BehaviorSubject<Option> = new BehaviorSubject<Option>(JSON.parse(null));
  private saveOrUpdateAdditionSubject: BehaviorSubject<Addition> = new BehaviorSubject<Addition>(JSON.parse(null));
  
  constructor(
    private http: HttpClient,
    private _loginService: LoginService) {
  }


  getAllProductsForCategory(categoryId:number): Observable<Array<Product>> {
    const apiUrl = this.productUrl + categoryId +'/products'
    const appSession = this._loginService.getApplication();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', appSession.id);
    return this.http.get<Array<Product>>(apiUrl, { headers, params }).pipe(
      tap((products) => {
          this.getAllProductsForCategorySubject.next(products);
      })
    );
  }

  getAllOptionsForProduct(productId:number): Observable<Array<Option>> {
    const apiUrl = this.optionsUrl + productId +'/productOptions'
    const appSession = this._loginService.getApplication();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', appSession.id);
    return this.http.get<Array<Option>>(apiUrl, { headers, params }).pipe(
      tap((options) => {
          this.getAllOptionsForProductSubject.next(options);
      })
    );
  }


  getAllAdditionsForProduct(productId:number): Observable<Array<Addition>> {
    const apiUrl = this.optionsUrl + productId +'/productAdditions'
    const appSession = this._loginService.getApplication();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', appSession.id);
    return this.http.get<Array<Addition>>(apiUrl, { headers, params }).pipe(
      tap((options) => {
          this.getAllAdditionsForProductSubject.next(options);
      })
    );
  }

  


  saveOrUpdateProduct(payload: any,categoryId:number): Observable<Product> {
    const apiUrl = this.productUrl + categoryId +'/products'
    const appSession = this._loginService.getApplication();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', appSession.id);
    return this.http.post<Product>(apiUrl, payload, { headers, params }).pipe(
      tap((product) => {
        this.saveOrUpdateProductSubject.next(product);
      })
    );
  }


  saveOrUpdateOption(payload: any,productId:number): Observable<Product> {
    const apiUrl = this.optionsUrl + productId +'/productOptions'
    const appSession = this._loginService.getApplication();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', appSession.id);
    return this.http.post<Product>(apiUrl, payload, { headers, params }).pipe(
      tap((option) => {
        this.saveOrUpdateOptionSubject.next(option);
      })
    );
  }


  saveOrUpdateAddition(payload: any,productId:number): Observable<Addition> {
    const apiUrl = this.optionsUrl + productId +'/productAdditions'
    const appSession = this._loginService.getApplication();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', appSession.id);
    return this.http.post<Product>(apiUrl, payload, { headers, params }).pipe(
      tap((addition) => {
        this.saveOrUpdateAdditionSubject.next(addition);
      })
    );
  }

  constructHeaders():any {
    const appSession = this._loginService.getApplication();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', appSession.id);
    return {headers, params};
  }

  getProductById(id:number): Observable<any> {
    let headers = this.constructHeaders();
    let productById = `${this.optionsUrl}/${id}`;
    return this.http.get<any>(productById, headers ).pipe(
      tap((category) => {
        console.log(category);
      })
    );
  }


  deleteProductById(id:number): Observable<any> {
    let headers = this.constructHeaders();
    const apiUrl = this.optionsUrl + id;
    return this.http.get<any>(apiUrl,headers).pipe(
      tap(() => {
      })
    );
  }

  deleteOptionsById(id:number): Observable<any> {
    let headers = this.constructHeaders();
    const apiUrl = this.optionsUrl + id +'/productOptions'
    return this.http.delete<any>(apiUrl,headers).pipe(
      tap(() => {
      })
    );
  }

  deleteAdditionsById(id:number): Observable<any> {
    let headers = this.constructHeaders();
    const apiUrl = this.optionsUrl + id +'/productAdditions'
    return this.http.delete<any>(apiUrl,headers).pipe(
      tap(() => {
      })
    );
  }

}

