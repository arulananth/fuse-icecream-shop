import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { CategoryManagement } from './category-management.component';
import { MaterialModule } from '../../../angular-material-elements/material.module';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { ToastaModule } from 'ngx-toasta';
import { AuthGuard } from 'app/_guards/auth.guard';

const routes = [
    {
        path     : 'shop-management/category-management',
        component: CategoryManagement,
        canActivate:[AuthGuard]
    }
];

@NgModule({
    declarations: [
        CategoryManagement
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MaterialModule,
        FileUploadModule,
        ToastaModule
    ],
    exports     : [
        CategoryManagement
    ]
})

export class CategoryManagementModule
{
}
