import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { CategoryManagementService } from '@/_services';
import { ProductCategory } from '@/_models/product-management';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ToastOptions,ToastData,ToastaService } from 'ngx-toasta';
const url = 'http://genuineicecreamshopbalancer-87772051f33c15de.elb.eu-west-1.amazonaws.com:3000/api/v1/UploadedImages/product_categories/upload?access_token=wyHuzx1lUjFKaZ6eTwuIzqN2Jb4WEjrR1BVx8ARRsftVM0K93ddj56Mpw6GmEsiC&ownerId=1';

@Component({
  selector: 'category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagement implements OnInit {
  displayedColumns: string[] = ['name', 'id', 'actions'];
  dataSource: MatTableDataSource<ProductCategory> = null;
  categoryForm: FormGroup = null;
  uploader:FileUploader = new FileUploader({url: url});
  private productCategories : Array<ProductCategory>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('categoryPaginator') categoryPaginator: MatPaginator;
  toastOptions: ToastOptions = {
    title: "",
    msg: "",
    showClose: false,
    timeout: 5000,
    theme: 'bootstrap',
    onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
    },
    onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
    }
};

  constructor(
    private _categoryManagementService: CategoryManagementService,
    private _formBuilder: FormBuilder,
    private toastaService:ToastaService
  ) {

  }

  ngOnInit() {
    this.initializeForm();
    this._categoryManagementService.getAllCategories()
    .subscribe((categories: Array<ProductCategory>) => {
    this.productCategories = categories;
    this.dataSource = new MatTableDataSource(this.productCategories);
    this.dataSource.paginator = this.categoryPaginator;
    },
    error => {
      window.console.log(error);
      window.console.log('unauthorized');
    });

  }

  private initializeForm(): void {
    this.categoryForm = this._formBuilder.group({
      name: ['', Validators.required],
      imageFile: ['', Validators.required]
    });
  }

  deleteCategory(row:any){
    this._categoryManagementService.deleteCategoryById(row['id']).subscribe(()=>{
      this.toastOptions.msg = "Product Category is deleted Successfully";
      this.toastaService.success(this.toastOptions);
      this._categoryManagementService.getAllCategories().subscribe((categories:Array<ProductCategory>)=>{
        this.productCategories = categories;
        this.dataSource = new MatTableDataSource(this.productCategories);
        this.dataSource.paginator = this.categoryPaginator;
      },error =>{
        this.toastOptions.msg = "Error retrieving the details";
        this.toastaService.error(this.toastOptions);
      }
      );
    },error =>{
      this.toastOptions.msg = "Error deleting the product category";
      this.toastaService.error(this.toastOptions);
    }
    );
  }

  
  editCategory(row:any) {
    this.categoryForm.get('name').setValue(row['name']);
  }

  submit(): void {
    const payload = {};
    payload['name'] = this.categoryForm.controls['name'].value;
    let fileURL = this.categoryForm.controls['image'].value;
    this._categoryManagementService.saveOrUpdateCategory(payload)
      .subscribe((data) => {
        this._categoryManagementService.getAllCategories()
          .subscribe((categories) => {
            this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
            this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                 console.log('ImageUpload:uploaded:', item, status, response);
                 alert('File uploaded successfully');
             };
            this.uploader.uploadAll();
          },
            error => {
              window.console.log(error);
              window.console.log('error retrieving the category details');
            });
      },
        error => {
          window.console.log(error);
          window.console.log('error saving the category details');
        });
  }
}
