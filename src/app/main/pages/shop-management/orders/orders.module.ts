import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatButtonModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '../../../angular-material-elements/material.module';
import { OrderManagementComponent } from './orders.component';
import { ShowOrderComponent } from './show-order/show-order.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MomentModule } from 'ngx-moment';
import { TimeDifferencePipe } from './timeDiff';
import { SDKBrowserModule} from '@/sdk/index';
import { ToastaModule } from 'ngx-toasta';
import { AuthGuard } from '@/_guards';

const routes = [
    {
        path     : 'shop-management/orders',
        component: OrderManagementComponent,
        canActivate:[AuthGuard]
    },
    {
      path: 'shop-management/orders/:id',
      component: ShowOrderComponent,
      canActivate:[AuthGuard]
    }
];

@NgModule({
    declarations: [
        OrderManagementComponent,
        ShowOrderComponent,
        TimeDifferencePipe
    ],
    imports     : [
        NgxMaterialTimepickerModule.forRoot(),
        RouterModule.forChild(routes),
        ToastaModule.forRoot(),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatButtonModule,
        MatDatepickerModule,
        MaterialModule,
        FuseSharedModule,
        MomentModule,
        SDKBrowserModule
    ],
    exports     : [
        OrderManagementComponent
    ]
})

export class OrderManagementModule
{
}
