import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SelectDialogComponent } from '@/main/components/select-dialog';
import { MatDialogRef, MatDialog } from '@angular/material';

@Injectable()
export class SelectDialogsService {

    constructor(private dialog: MatDialog) { }

    public select(title: string, items: any = [], placeholerText: string): Observable<any> {

        let dialogRef: MatDialogRef<SelectDialogComponent>;

        dialogRef = this.dialog.open(SelectDialogComponent);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.selectedItem = '';
        dialogRef.componentInstance.items = items;

        return dialogRef.afterClosed();
    }
}