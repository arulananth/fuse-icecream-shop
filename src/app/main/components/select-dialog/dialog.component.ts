import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'select-dialog',
    template: `
        <p>{{ title }}</p>
        <mat-form-field style="width:100%;" appearance="outline">
          <mat-label>{{name}}</mat-label>
          <mat-select [(value)]="selected" placeholder="placeholderText">
            <mat-option *ngFor="let item of items" [value]="item.id">
                {{item.name}}
            </mat-option>
          </mat-select>
          <mat-icon matSuffix class="secondary-text">format_list_numbered</mat-icon>
          <mat-error>Status is required!</mat-error>
        </mat-form-field>
        <button type="button" class="p-4 w-100 mr-24" mat-raised-button 
            (click)="dialogRef.close(selected )">OK</button>
        <button type="button" mat-button class="p-4 w-80"
            (click)="dialogRef.close()">Cancel</button>
    `,
})
export class SelectDialogComponent {

    public title: string; 
    public placeholderText: string;
    public selectedItem: any;
    public items: any = [];

    constructor(public dialogRef: MatDialogRef<SelectDialogComponent>) {

    }
}