import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatTabChangeEvent,MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductCategory, ReferenceUnit,Option,Addition } from '../../../../_models/product-management';
import { ActivatedRoute } from '@angular/router';
import { ProductManagementService, CategoryManagementService } from '@/_services';
import { ToastaConfig, ToastaService,ToastData,ToastOptions } from 'ngx-toasta';
import { FileUploader } from 'ng2-file-upload';
import { config} from '@/_models';
import { LoopBackAuth, UploadedImageApi } from '@/sdk/services';
import { SDKToken} from '@/sdk/models';

@Component({
    selector: 'product-management',
    templateUrl: './product-management.component.html',
    styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
    uploader:FileUploader = new FileUploader({url: config.apiUrl});

    @ViewChild('productsPaginator') productsPaginator: MatPaginator;
    @ViewChild('additionsPaginator') additionsPaginator: MatPaginator;
    @ViewChild('optionsPaginator') optionsPaginator: MatPaginator;
   
    /**
     *  Constructor
     *  args formBuilder : FormBuilder
     */
    constructor(private _formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private productManagementService: ProductManagementService,
        private _categoryManagementService: CategoryManagementService,
        private toastaConfig:ToastaConfig,
        private toastaService:ToastaService,
        private _auth: LoopBackAuth,
        private _uploadedImageApi: UploadedImageApi
        ) { 
            this.toastaConfig.position = "bottom-right";
        }

    displayedColumns: string[] = ['name', 'id', 'actions'];
    dataSourceProducts: MatTableDataSource<Product> = null;
    dataSourceOptions: MatTableDataSource<Option> = null;
    dataSourceAdditions: MatTableDataSource<Addition> = null;
    productForm: FormGroup = null;
    optionsForm: FormGroup = null;
    additionsForm: FormGroup = null;
    products: Array<Product> = new Array<Product>();
    options: Array<Option> = new Array<Option>();
    additions: Array<Addition> = new Array<Addition>();
    optionSelected: number = 0;
    referenceUnits: ReferenceUnit[] = [
        { name: 'kg',value:0, },
        { name: 'g',value:1 }
    ];
    categoryId: number = 0;
    optionsReferenceUnits: ReferenceUnit[] = [
        { name: 'flavour',value:0 },
        { name: 'kg',value:1 },
        { name: 'lbs',value:2 }
    ];
    selectedProductId:number;
    productCategories: Array<ProductCategory>;
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

    ngOnInit() {
        this.initializeForms();
        this.route.params
        .subscribe(params => {
        this.categoryId = params['categoryId'] || 1;
        this._categoryManagementService.getAllCategories()
            .subscribe((categories: Array<ProductCategory>) => {
                this.productCategories = categories;
                this.productManagementService.getAllProductsForCategory(this.categoryId)
                    .subscribe((products: Array<Product>) => {
                        if (products.length > 0) {
                            this.products = products;
                            this.dataSourceProducts = new MatTableDataSource(this.products);
                            setTimeout(() => this.dataSourceProducts.paginator = this.productsPaginator);
                        }
                    },
                    error => {
                        window.console.log(error);
                    });
            },
            error => {
                window.console.log(error);
                window.console.log('unauthorized');
            });
        }
        );

    }

    tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
        this.optionSelected = tabChangeEvent.index;
    }

    uploadImage(productId: number): void {
        let token:SDKToken = this._auth.getToken();
        let url = `${config.apiUrl}UploadedImages/products/upload?access_token=${token.id}&ownerId=${productId}`;
        this.uploader.setOptions({url: url});
        this.uploader.queue.forEach(file => {
            file.alias = 'photos';
            file.url = url;
            this._uploadedImageApi.upload('products', productId, file.file)
                .subscribe(image => {
                    console.log(image);
                }, error => {
                    console.log(error);
                });
        });
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log('ImageUpload:uploaded:', item, status, response);
            alert('File uploaded successfully');
        };
        //this.uploader.uploadAll();
    }

    addNew() {
        
        switch (this.optionSelected) {
            case 0:
                this.productForm.reset();
                break;
            case 1:
                this.optionsForm.reset();
                break;
            case 2:
                this.additionsForm.reset();
                break;
        }
    }

    editAddition(row:any){
        let addition = this.additions.find(addition => addition['id'] == row['id']);
        this.additionsForm.get('name').setValue(addition['name']);
        this.additionsForm.get('description').setValue(addition['description']);
        this.additionsForm.get('cost').setValue(addition['cost']);
    }


    generatePayloadForProduct() {
        let payload = {};
        payload['name'] = this.productForm.get('name').value;
        payload['productCategoryId'] = this.productForm.get('name').value;
        payload['description'] = this.productForm.get('description').value;
        payload['cost'] = this.productForm.get('cost').value;
        //payload['numOptions'] = this.productForm.get('numOptions').value;
        payload['maxOptions'] = this.productForm.get('maxOptions').value;
        //payload['costPerUnit'] = this.productForm.get('costPerUnit').value;
        // TODO need to be verified on what is the use of this field
        payload['unitType'] = 0;
        payload['min'] = this.productForm.get('min').value;
        payload['max'] = this.productForm.get('max').value;
        return payload;
    }

    generatePayloadForOption() {
        let payload = {};
        payload['name'] = this.optionsForm.get('name').value;
        payload['description'] = this.optionsForm.get('description').value;
        payload['cost'] = this.optionsForm.get('cost').value;
        //payload['numOptions'] = this.productForm.get('numOptions').value;
        //payload['costPerUnit'] = this.productForm.get('costPerUnit').value;
        // TODO need to be verified on what is the use of this field
        payload['unitType'] = 0;
        return payload;
    }

    generatePayloadAddition() {
        let payload = {};
        payload['name'] = this.additionsForm.get('name').value;
        payload['description'] = this.additionsForm.get('description').value;
        payload['cost'] = this.additionsForm.get('cost').value;
        return payload;
    }

    saveOrUpdateProduct() {
        const payload: any = this.generatePayloadForProduct();
        this.productManagementService.saveOrUpdateProduct(payload, this.categoryId)
        .subscribe((product: Product) => {
        this.toastOptions.msg = "Product is saved Successfully";
        this.toastaService.success(this.toastOptions);
        this.productManagementService.getAllProductsForCategory(this.categoryId)
        .subscribe((products: Array<Product>) => {
                if (products.length > 0) {
                    this.products = products;
                    this.dataSourceProducts = new MatTableDataSource(this.products);
                    setTimeout(() => this.dataSourceProducts.paginator = this.productsPaginator);
                }
            },
            error => {
                window.console.log(error);
            });
        },
        error => {
            this.toastOptions.msg = "Error Saving the product details";
            this.toastaService.error(this.toastOptions);
            window.console.log(error);
        });
    }

    deleteProduct(row:any){
        this.productManagementService.deleteProductById(row['id']).subscribe(()=>{
            this.toastOptions.msg = "Product is deleted Successfully";
            this.toastaService.success(this.toastOptions);
            this.productManagementService.getAllProductsForCategory(this.selectedProductId).subscribe((products:Array<Product>)=>{
              this.products = products;
              this.dataSourceProducts = new MatTableDataSource(this.products);
              this.dataSourceProducts.paginator = this.productsPaginator;
            },error =>{
              this.toastOptions.msg = "Error retrieving the details";
              this.toastaService.error(this.toastOptions);
            }
            );
          },error =>{
            console.log(error);
            this.toastOptions.msg = "Error deleting the product";
            this.toastaService.error(this.toastOptions);
          }
          );
      }

      deleteOptions(row:any){
        this.productManagementService.deleteOptionsById(row['id']).subscribe(()=>{
          this.toastOptions.msg = "Product Options is deleted Successfully";
          this.toastaService.success(this.toastOptions);
          this.productManagementService.getAllOptionsForProduct(this.selectedProductId).subscribe((options:Array<Option>)=>{
            this.options = options;
            this.dataSourceOptions = new MatTableDataSource(this.options);
            this.dataSourceOptions.paginator = this.optionsPaginator;
          },error =>{
            this.toastOptions.msg = "Error retrieving the details";
            this.toastaService.error(this.toastOptions);
          }
          );
        },error =>{
          this.toastOptions.msg = "Error deleting the product options";
          this.toastaService.error(this.toastOptions);
        }
        );
      }

      deleteAdditions(row:any){
        this.productManagementService.deleteAdditionsById(row['id']).subscribe(()=>{
            this.toastOptions.msg = "Product Additions is deleted Successfully";
            this.toastaService.success(this.toastOptions);
            this.productManagementService.getAllOptionsForProduct(this.selectedProductId).subscribe((additions:Array<Addition>)=>{
              this.additions = additions;
              this.dataSourceAdditions = new MatTableDataSource(this.additions);
              this.dataSourceAdditions.paginator = this.additionsPaginator;
            },error =>{
              this.toastOptions.msg = "Error retrieving the details";
              this.toastaService.error(this.toastOptions);
            }
            );
          },error =>{
            this.toastOptions.msg = "Error deleting the product additions";
            this.toastaService.error(this.toastOptions);
          }
          );
      }


    saveOrUpdateOption() {
        const payload: any = this.generatePayloadForOption();
        this.productManagementService.saveOrUpdateOption(payload, this.selectedProductId)
        .subscribe((option: Option) => {
        this.toastOptions.msg = "Option Details are saved successfully !!";
        this.toastaService.success(this.toastOptions);
        this.productManagementService.getAllOptionsForProduct(this.selectedProductId)
        .subscribe((options: Array<Option>) => {
                if (options.length > 0) {
                    this.options = options;
                    this.dataSourceOptions = new MatTableDataSource(this.options);
                    setTimeout(() => this.dataSourceOptions.paginator = this.optionsPaginator);
                }
            },
            error => {
                window.console.log(error);
            });
        },
        error => {
            this.toastOptions.msg = "Error Saving the Option details";
            this.toastaService.error(this.toastOptions);
            window.console.log(error);
        });
    }

    saveOrUpdateAddition() {
        const payload: any = this.generatePayloadAddition();
        this.productManagementService.saveOrUpdateAddition(payload, this.selectedProductId)
        .subscribe((addition: Addition) => {
        this.toastOptions.msg = "Addition Details are saved successfully !!";
        this.toastaService.success(this.toastOptions);
        this.productManagementService.getAllAdditionsForProduct(this.categoryId)
        .subscribe((additions: Array<Addition>) => {
                if (additions.length > 0) {
                    this.additions = additions;
                    this.dataSourceAdditions = new MatTableDataSource(this.additions);
                    setTimeout(() => this.dataSourceAdditions.paginator = this.additionsPaginator);
                }
            },
            error => {
                window.console.log(error);
            });
        },
        error => {
            this.toastOptions.msg = "Error Saving the Additions details";
            this.toastaService.error(this.toastOptions);
            window.console.log(error);
        });
    }

    editProduct(row:any){
        this.selectedProductId = row['id'];
        this.productForm.reset();
        this.productForm.get('productCategory').setValue(row['productCategoryId']);
        this.productForm.get('name').setValue(row['name']);
        this.productForm.get('description').setValue(row['description']);
        this.productForm.get('numOptions').setValue(row['numOptions']);
        this.productForm.get('maxOptions').setValue(row['maxOptions']);
        this.productForm.get('cost').setValue(row['cost']);
        this.productForm.get('costPerUnit').setValue(row['costPerUnit']);
        this.productForm.get('min').setValue(row['min']);
        this.productForm.get('max').setValue(row['max']);
        // this._uploadedImageApi.download('products', row[imageFile])
        //     .subscribe((image:any) => {
        //         console.log(image);
        //         //this.productForm.get('image').setValue(row[imageFile]);
        //     })
        this.productManagementService.getAllOptionsForProduct(this.selectedProductId)
        .subscribe((options: Array<Option>) => {
            this.options = options;
            this.dataSourceOptions = new MatTableDataSource(this.options);
            this.dataSourceOptions.paginator = this.optionsPaginator;
        this.productManagementService.getAllAdditionsForProduct(this.selectedProductId)
        .subscribe((additions: Array<Addition>) => {
            this.additions = additions;
            this.dataSourceAdditions = new MatTableDataSource(this.additions);
            this.dataSourceAdditions.paginator = this.additionsPaginator;
            },
            error => {
                window.console.log(error);
            });
        },
        error => {
            window.console.log(error);
        });
       
    }


    editOption(row:any){
        let option = this.options.find(option => option['id'] == row['id']);
        this.optionsForm.get('name').setValue(option['name']);
        this.optionsForm.get('description').setValue(option['description']);
        this.optionsForm.get('cost').setValue(option['cost']);
        this.optionsForm.get('costPerUnit').setValue(option['costPerUnit']);
    }

    private initializeForms() {
        // product form
        this.productForm = this._formBuilder.group({
            productCategory: ['', Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required],
            image: [''],
            numOptions: [''],
            maxOptions: [''],
            cost: [''],
            costPerUnit: [''],
            unitType: ['', Validators.required],
            min: ['', Validators.required],
            max: ['', Validators.required]
        });

        // options form
        this.optionsForm = this._formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            image: [''],
            cost: ['', Validators.required],
            costPerUnit: ['', Validators.required],
            unitType: ['', Validators.required],
        });

        // options form
        this.additionsForm = this._formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            additionsImage: [''],
            cost: ['', Validators.required],
        });
    }
}
