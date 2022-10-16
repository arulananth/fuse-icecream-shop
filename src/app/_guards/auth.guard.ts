import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { APP_CONSTANTS } from '../../app/_models';
import { LoginService } from '@/_services';
import { ToastaService } from 'ngx-toasta';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService,
        private _toastaService:ToastaService
    ) {}

    canActivate(route: ActivatedRouteSnapshot) {
        const session = this.loginService.getApplication();
        if (session && session.user.userType == APP_CONSTANTS.ADMINISTRATOR) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login']);
        return false;
    }
}