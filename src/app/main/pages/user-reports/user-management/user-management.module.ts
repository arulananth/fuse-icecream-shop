import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { UserManagement } from './user-management.component';
import { MaterialModule } from 'app/main/angular-material-elements/material.module';
import { AuthGuard } from '@/_guards';

const routes = [
    {
        path: 'user-reports/user-management',
        component: UserManagement,
        canActivate:[AuthGuard]
    }
];

@NgModule({
    declarations: [
        UserManagement
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        MaterialModule
    ],
    exports     : [
        UserManagement
    ]
})

export class UserManagementModule
{
}
