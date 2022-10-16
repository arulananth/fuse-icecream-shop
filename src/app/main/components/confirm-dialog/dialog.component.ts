import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    template: `
        <p>{{ title }}</p>
        <p>{{ message }}</p>
        <button type="button" class="p-4 w-100 mr-24" mat-raised-button 
            (click)="dialogRef.close(true)">OK</button>
        <button type="button" mat-button class="p-4 w-80"
            (click)="dialogRef.close()">Cancel</button>
    `,
})
export class ConfirmDialogComponent {

    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {

    }
}