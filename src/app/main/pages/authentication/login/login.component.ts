import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoginService,UserService } from '@/_services';
import { User } from '@/_models';
import {SDKToken } from '@/sdk/models/BaseModels';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup; 

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router:Router,
        private _loginService: LoginService,
        private _userService:UserService
        )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    login():void
    {
        //this._router.navigate(['sample']);
        this._loginService.login(this.loginForm.value)
        .subscribe((data:SDKToken) => {
            this._userService.getUserById(data.userId,data.id)
                .subscribe((user:User)=>{
                    let appSession = this._loginService.getApplication();
                    appSession.user = user;
                    this._loginService.saveApplication(appSession);
                    this._router.navigate(['/shop-management/orders']);
                },
                error => {
                    console.log(error);
                }
            )
        },
        error => {
          window.console.log(error);
          window.console.log('unauthorized');
        });
    }
}
