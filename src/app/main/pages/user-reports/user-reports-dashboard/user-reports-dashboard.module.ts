import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { UserReportDashboard } from './user-reports-dashboard.component';
import { MaterialModule } from 'app/main/angular-material-elements/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthGuard } from '@/_guards';

const routes = [
    {
        path     : 'user-reports/user-reports-dashboard',
        component: UserReportDashboard,
        canActivate:[AuthGuard]
    }
];

@NgModule({
    declarations: [
        UserReportDashboard
    ],
    imports     : [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        MaterialModule,
        NgxChartsModule
    ],
    exports     : [
        UserReportDashboard
    ]
})

export class UserReportDashboardModule
{
}
