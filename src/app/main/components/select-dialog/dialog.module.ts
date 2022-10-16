import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDialogComponent, SelectDialogsService } from '@/main/components/select-dialog';
import { MatButtonModule, MatDialogModule, MatSelectModule, MatOptionModule, MatIconModule, MatFormFieldModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule, 
    MatFormFieldModule
  ],
  declarations: [SelectDialogComponent],
  exports: [SelectDialogComponent],
  entryComponents: [SelectDialogComponent],
  providers: [SelectDialogsService]
})
export class SelectDialogsModule { }