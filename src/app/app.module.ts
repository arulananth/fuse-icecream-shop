import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';
import { OnlyNumber } from '@/_directives/only-number';
import { DialogsModule } from '@/main/components/confirm-dialog';
import { SelectDialogsModule } from '@/main/components/select-dialog';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { LoginModule } from './main/pages/authentication/login/login.module';
import { ForgotPasswordModule } from './main/pages/authentication/forgot-password/forgot-password.module';
import { CategoryManagementModule } from './main/pages/shop-management/category-management/category-management.module';
import { ProductManagementModule } from './main/pages/shop-management/product-management/product-management.module';
import { OrderManagementModule } from './main/pages/shop-management/orders/orders.module';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { ErrorInterceptor } from './_helpers';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SDKBrowserModule } from './sdk/index';
import { UserManagementModule } from './main/pages/user-reports/user-management/user-management.module'
import { UserReportDashboardModule } from './main/pages/user-reports/user-reports-dashboard/user-reports-dashboard.module';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        OnlyNumber
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        // angular loopback sdk module
        SDKBrowserModule.forRoot(),
        TranslateModule.forRoot(),
        NgxMaterialTimepickerModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        // App modules
        DialogsModule,
        SelectDialogsModule,
        LayoutModule,
        LoginModule,
        ForgotPasswordModule,
        CategoryManagementModule,
        ProductManagementModule,
        OrderManagementModule,
        FileUploadModule,
        UserManagementModule,
        UserReportDashboardModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
