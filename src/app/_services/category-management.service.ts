import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { config } from '@/_models/constants/config';
import { ProductCategory } from '@/_models/product-management';
import { LoginService } from './login.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryManagementService {
  private getAllCategoriesSubject: BehaviorSubject<Array<ProductCategory>> = new BehaviorSubject<Array<ProductCategory>>(JSON.parse(null));
  private categorySubject: BehaviorSubject<ProductCategory> = new BehaviorSubject<ProductCategory>(JSON.parse(null));
  private categoryUpdate: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(null));
  private categoryUrl = config.apiUrl + 'ProductCategories';
  private addOrUpdateCategory = config.apiUrl + 'UploadedImages/product_categories/upload';

  constructor(
    private http: HttpClient,
    private _loginService: LoginService) {
  }

  constructHeaders():any {
    const appSession = this._loginService.getApplication();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', appSession.id);
    return {headers, params};
  }

  getCategoryById(id:number): Observable<any> {
    let headers = this.constructHeaders();
    let categoryById = `${this.categoryUrl}/${id}`;
    return this.http.get<any>(categoryById, headers ).pipe(
      tap((category) => {
        this.categorySubject.next(category);
      })
    );
  }

  getAllCategories(): Observable<Array<ProductCategory>> {
    const appSession = this._loginService.getApplication();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', appSession.id);
    return this.http.get<Array<ProductCategory>>(this.categoryUrl, { headers, params }).pipe(
      tap((categories) => {
        this.getAllCategoriesSubject.next(categories);
      })
    );
  }


  saveOrUpdateCategory(payload: any): Observable<ProductCategory> {
    const appSession = this._loginService.getApplication();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('access_token', appSession.id);
    return this.http.post<ProductCategory>(this.categoryUrl, payload, { headers, params }).pipe(
      tap((categories) => {
        this.categoryUpdate.next(categories);
      })
    );
  }

  uploadCategoryImage(file: File, categoryId:Number): Observable<any> {
    const appSession = this._loginService.getApplication();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'form/multi-part');
    let params = new HttpParams();
    params = params.append('access_token', appSession.id);
    params.append('ownerId',''+categoryId);
    const body = {};
    body['file'] = file;
    return this.http.post<any>(this.addOrUpdateCategory,body,{ headers, params }).pipe(
      tap((category) => {
        this.categoryUpdate.next(category);
      })
    );
  }

  deleteCategoryById(id:number): Observable<any> {
    let headers = this.constructHeaders();
    let categoryById = `${this.categoryUrl}/${id}`;
    return this.http.delete<any>(categoryById,headers).pipe(
      tap(() => {
      })
    );
  }



}

