import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProductManagementComponent } from './product-management.component';
import { MaterialModule } from '../../../angular-material-elements/material.module';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { ToastaModule } from 'ngx-toasta';
import { AuthGuard } from '@/_guards';

const routes = [
    {
        path     : 'shop-management/product-management',
        component: ProductManagementComponent,
        canActivate:[AuthGuard]
    }
];

@NgModule({
    declarations: [
        ProductManagementComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MaterialModule,
        FileUploadModule,
        ToastaModule.forRoot()
    ],
    exports     : [
        ProductManagementComponent
    ]
})

export class ProductManagementModule
{
}
