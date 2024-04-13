import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/intefaces/dialog-data';

@Component({
  selector: 'app-confirm-dialog-box',
  templateUrl: './confirm-dialog-box.component.html',
  styleUrls: ['./confirm-dialog-box.component.scss']
})
export class ConfirmDialogBoxComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
